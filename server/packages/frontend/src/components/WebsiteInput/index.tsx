import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import validUrl from 'valid-url';
import psl from 'psl';
import { useValidateHostMutation } from '@/data/generated';
import { Loader2 } from 'lucide-react';

const Input = styled.input`
    background-color: var(--light-gray);
    font-size: 64px;
    line-height: 32px;
    padding: 48px;
    text-transform: uppercase;
    font-family: var(--font-vt323);

    &:focus-visible {
        outline: 8px solid var(--dark-gray);
        outline-offset: -8px;
    }
`;

const Message = styled.div`
    display: flex;
    font-size: 24px;
    text-align: center;
    gap: 16px;
    align-items: center;
    justify-content: center;
    background-color: var(--dark-gray);
    color: white;
    padding: 16px;
`;

const Inverse = styled.span`
    background-color: white;
    color: var(--dark-gray);
    padding: 4px 12px;
`;

export interface WebsiteInputProps {
    onHost: (host: string) => void;
}

export default function WebsiteInput({ onHost }: WebsiteInputProps) {
    const [host, setHost] = useState("");
    const [isValidated, setIsValidated] = useState(false);
    const [validateHost, { loading }] = useValidateHostMutation();

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        setHost(text.replace(/[^a-z0-9.]+/gi, ""));
    }, []);

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        // Prevent form from submitting
        e.preventDefault();

        // GUARD: The host must be valid
        if (isValidated) {
            onHost(host);
        }
    }, [isValidated, host, onHost]);

    useEffect(() => {
        // Construct an abort signal we can pass to fetch
        const controller = new AbortController();

        /** Define an async function that handles all validation */
        async function validate() {
            // Set the validation status to false
            setIsValidated(false);

            // GUARD: Check that the URL is valid and the public suffix is valid
            // as well
            if (validUrl.isHttpsUri(`https://${host}`) && psl.isValid(host)) {
                // Instruct the backend to fetch HEAD for the URL to see if it's available
                const { data } = await validateHost({ 
                    variables: { host }, context: { fetchOptions: { signal: controller.signal } } 
                });

                // Then pipe the output to the validations tate
                setIsValidated(data?.validateHost || false)
            }
        }

        // Execute the function
        validate();

        // Abort the request whenever a new host comes in
        return () => controller.abort();
    }, [host, validateHost]);

    return (
        <form onSubmit={handleSubmit}>
            <Input
                value={host}
                placeholder="www.ddw.nl"
                autoFocus
                onChange={handleChange}
            />
            <h2>
                {isValidated ? (
                    <Message>
                        Press <Inverse>Enter ⏎</Inverse> to continue!
                    </Message>
                ) : (

                    <Message>
                        Type a valid domain name first...
                        {loading && <Loader2 className="animate-spin w-4 h-4" />}
                    </Message>
                )}
            </h2>
        </form>
    );
}
