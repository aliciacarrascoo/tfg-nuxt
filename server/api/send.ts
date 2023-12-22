import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async () => {
    console.log('entra')
    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['aliciacarrasco000@gmail.com'],
            subject: 'Hello world',
            html: '<strong>It works!</strong>',
        });

        return data;
    } catch (error) {
        return { error };
    }
});
