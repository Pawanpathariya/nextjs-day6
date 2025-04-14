import { z } from 'zod';

const schema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long').max(50, 'Name must be at most 50 characters long'),
    email: z.string().email().min(1, "Email cannot be blank").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: z.string().min(8, 'Password must be at least 8 characters long').regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{8,}$/, 'Password must contain at least one letter, one number, and one special character'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits long')
  });


  export default schema;