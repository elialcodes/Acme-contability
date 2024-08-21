//file with server actions, functions to create, update and delete invoices.
//These server actions will be executed in the server side and will be invocated
//from their respective forms.

'use server'; //with this line we say all functions are server actions

import { z } from 'zod'; //library zod to validate types
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

//we define a template or schema zod with the same structure than our dates
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(), //parse from string to number
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

//server action to create an invoice
export async function createInvoice(formData: FormData) {
  //this function is invocated in the form to create an invoice, so
  //we make constants, parse them acording to FormSchema
  //and we get them from the formData object from its especific form
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

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
  //so, we prepare it to make a new request to the server.
  revalidatePath('/dashboard/invoices');

  //after the user creates a new invoice, we can redirect him
  //to the previus page
  redirect('/dashboard/invoices');
}

//server action to update an invoice
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
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');

  redirect('/dashboard/invoices');
}

//server action to delete an invoice
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}
