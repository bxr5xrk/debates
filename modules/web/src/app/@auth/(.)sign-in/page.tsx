import { SignInInterceptor } from '@/shared/interceptors';

export default function Page(): JSX.Element {
    return (
        <div className='fixed inset-0 z-10'>
            <SignInInterceptor />
        </div>
    );
}
