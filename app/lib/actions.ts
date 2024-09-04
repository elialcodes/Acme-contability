//file with server actions: functions to create, update and delete invoices
//and authenticate function
//These server actions will be executed in the server side and will be invocated
//in their respective forms.

'use server'; //with this line we say all functions are server actions

import { z } from 'zod'; //library zod to validate types
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth'; //we import signIn function from auth.ts file
import { AuthError } from 'next-auth'; //we have istalled NextAuth previously

//we define a template (or schema) zod with the same structure than our invoices forms dates.
//in the inputs, if the user types an error, a nice message will be returned
const FormSchemaInvoice = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.', //nice message
  }),
  amount: z.coerce
    .number() //parse from string to number
    .gt(0, { message: 'Please enter an amount greater than $0.' }), //nice message
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.', //nice message
  }),
  date: z.string(),
});

//interface for our invoices forms dates:
//errors in each field (customerId, amount and status if user makes a mistakes,
//the error will be an array of string, I really don´t know why)
//message (nice message error if the customer doesn´t types and
//tries to send the form)
export interface StateErrorInvoices {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
}

const CreateInvoice = FormSchemaInvoice.omit({ id: true, date: true });
const UpdateInvoice = FormSchemaInvoice.omit({ id: true, date: true });

//server action to CREATE AN INVOICE:
//this function is invocated in the specific form to create an invoice (in action atribute)
//we don´t use the argument prevState in this case, but it is a requiered prop
//in create-form.tsx when we use the hook useFormState.
//FormData is a constructor, and it´s an object
//(a group of key-value pairs with all the form fields)
export async function createInvoice(_prevState: StateErrorInvoices, formData: FormData) {
  //we parse acording the FormSchema and we get the values from the FormData object:
  //we use safeParse method, and it will return an object that contains:
  //1. data: fields information (customerId, amount, status)
  //2. success prop (boolean)
  //3. errors prop (contains information about the error)
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  //if form validation fails, return an object with 2 keys:
  //1. errors: an object with all the information about the error, and with
  //flatten().fieldErrors we can convert these errors into simple format
  //(flatten() aplana, lo hace algo más sencillo y legible)
  //2. message: a general message that says missing fields
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  //we get the constants and prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;

  //we parse the amount in cents to avoid floats
  const amountInCents = amount * 100;

  //we create a date with AAAA-MM-DD format
  const date = new Date().toISOString().split('T')[0]; //

  //we will insert the information in our DB with this SQL query
  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (error) {
    return { message: 'Database Error: Failed to Create Invoice' };
  }

  //we delete the previous cache of the route in Next with this line
  //so, we clean and prepare the cache to save a new route with
  //a new request to the server.
  revalidatePath('/dashboard/invoices');

  //after the user creates a new invoice, we can redirect him
  //to the previus page
  redirect('/dashboard/invoices');
}

//server action to UPDATE AN INVOICE
//this function is invocated in the specific form to update an invoice (in action atribute)
export async function updateInvoice(id: string, formData: FormData) {
  //we make constants from the formData object, parse them acording to FormSchema
  //and we get them from the especific form
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
  UPDATE invoices
  SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
  WHERE id = ${id}
`;
  } catch (error) {
    //we return an error message when the insert in DB fails
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');

  redirect('/dashboard/invoices');
}

//server action to DELETE AN INVOICE
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

//we define a template (or schema) zod with the same structure than our customer forms dates.
//in the inputs, if the user types an error, a nice message will be returned
const FormSchemaCustomer = z.object({
  id: z.string({
    invalid_type_error: 'Please select a customer.', //nice message
  }),
  name: z.string({
    invalid_type_error: 'Please enter a name.', //nice message
  }),
  email: z.string({
    invalid_type_error: 'Please enter an email.', //nice message
  }),
  image: z.string({
    invalid_type_error: 'Please enter a picture.', //nice message
  }),
});

//interface for our invoices forms dates:
//errors in each field (customerId, amount and status if user makes a mistakes,
//the error will be an array of string, I really don´t know why)
//message (nice message error if the customer doesn´t types and
//tries to send the form)
export interface StateErrorCustomers {
  errors?: {
    id?: string[];
    name?: string[];
    email?: string[];
    image?: string[];
  };
  message?: string | null;
}

const CreateCustomer = FormSchemaCustomer.omit({ id: true });
const UpdateCustomer = FormSchemaCustomer.omit({ id: true });

//server action to CREATE A CUSTOMER:
//this function is invocated in the specific form to create an invoice (in action atribute)
//we don´t use the argument prevState in this case, but it is a requiered prop
//in create-form.tsx when we use the hook useFormState.
//FormData is a constructor, and it´s an object
//(a group of key-value pairs with all the form fields)
export async function createCustomer(_prevState: StateErrorCustomers, formData: FormData) {
  //we parse acording the FormSchema and we get the values from the FormData object:
  //we use safeParse method, and it will return an object that contains:
  //1. data: fields information (customerId, amount, status)
  //2. success prop (boolean)
  //3. errors prop (contains information about the error)
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image: formData.get('image'),
  });

  //if form validation fails, return an object with 2 keys:
  //1. errors: an object with all the information about the error, and with
  //flatten().fieldErrors we can convert these errors into simple format
  //(flatten() aplana, lo hace algo más sencillo y legible)
  //2. message: a general message that says missing fields
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customer.',
    };
  }
  //we get the constants and prepare data for insertion into the database
  const { name, email, image } = validatedFields.data;

  //we will insert the information in our DB with this SQL query
  try {
    await sql`
    INSERT INTO customers (name, email, image_url)
    VALUES (${name}, ${email}, ${image})
  `;
  } catch (error) {
    return { message: 'Database Error: Failed to Create Customer' };
  }

  //we delete the previous cache of the route in Next with this line
  //so, we clean and prepare the cache to save a new route with
  //a new request to the server.
  revalidatePath('/dashboard/customers');

  //after the user creates a new invoice, we can redirect him
  //to the previus page
  redirect('/dashboard/customers');
}

//server action to UPDATE A CUSTOMER
//this function is invocated in the specific form to update an invoice (in action atribute)
export async function updateCustomer(id: string, formData: FormData) {
  //we make constants from the formData object, parse them acording to FormSchema
  //and we get them from the especific form
  const { name, email, image } = UpdateCustomer.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    image: formData.get('image'),
  });

  try {
    await sql`
  UPDATE customers
  SET name = ${name}, email = ${email}, image_url=${image}
  WHERE id = ${id}
`;
  } catch (error) {
    //we return an error message when the insert in DB fails
    return { message: 'Database Error: Failed to Update Customer.' };
  }

  revalidatePath('/dashboard/customers');

  redirect('/dashboard/customers');
}

//server action to DELETE A CUSTOMER
export async function deleteCustomer(id: string) {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
    revalidatePath('/dashboard/customers');
    return { message: 'Deleted Customer.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Customer.' };
  }
}
export interface StateErrorAuthentication {
  error?: {
    message: string;
  };
}

//server action to AUTHENTICATION
//this function is invocated in the specific form to log-in (in action atribute)
//we don´t use the argument prevState in this case, but it is a requiered prop
//in login-form.tsx when we use the hook useFormState.
export async function authenticate(
  _prevState: StateErrorAuthentication,
  formData: FormData,
): Promise<StateErrorAuthentication> {
  try {
    await signIn('credentials', formData);
    return {}; //return an empty object if there is success
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: { message: 'Invalid credentials.' } };
        default:
          return { error: { message: 'Something went wrong.' } };
      }
    }
    throw error;
  }
}
