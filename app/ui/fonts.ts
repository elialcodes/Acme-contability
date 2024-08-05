//Import the Inter font from the next/font/google module - this will be your primary font.
//Then, specify what subset you'd like to load. In this case, 'latin'.
//In some fonts we have to determinate weight or another feature.

import { Inter, Lusitana } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400', '700'] });
