import { prisma } from '@/lib/database';
import { hash } from '@/lib/password';
import readline from 'readline';

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}

async function createUser() { 
    const name = await ask('Enter user name: ');
    const email = await ask('Enter user email: ');
    const password = await ask('Enter user password: ');    
    const role = await ask('Enter user role (admin/user): ');

    const hashedPassword = await hash(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as 'admin' | 'user',
      },
    });
}

createUser()
  .then(() => {
    console.log('User created successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error creating user:', error);
    process.exit(1);
  });