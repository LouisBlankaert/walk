import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        // Ici, vous pouvez définir les identifiants admin
        const validEmail = process.env.ADMIN_EMAIL;
        const validPassword = process.env.ADMIN_PASSWORD;

        if (credentials.email === validEmail && credentials.password === validPassword) {
          return {
            id: '1',
            email: validEmail,
            name: 'Admin'
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = 'admin';
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
