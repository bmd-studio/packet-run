import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import validUrl from 'valid-url';
import psl from 'psl';
import { useValidateHostMutation } from '@/data/generated';
import { Loader2 } from 'lucide-react';
import { DEFAULT_WEBSITE } from '@/config';

const Input = styled.input`
    background-color: white;
    font-size: 64px;
    line-height: 32px;
    padding: 48px;
    padding-left: 0px;
    text-transform: uppercase;
    color: black;
    &:focus {
        outline: none;
    }

`;

const InputContainer = styled.div`
    display: flex;
    width: 100%;
    height: 109px;
    flex-direction:row;
    font-size: 64px;
    background-color: white;
    padding-left: 48px;
    box-sizing: border-box;
    &:focus-within {
        outline: 8px solid var(--dark-gray);
        outline-offset: -8px;
    }
`
const InputBeforText = styled.div`
    
`

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
        setHost(text.replace(/[^a-z0-9.-]+/gi, ""));
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
            <InputContainer>
                <InputBeforText>
                    www.
                </InputBeforText>
                <Input
                    value={host}
                    placeholder={DEFAULT_WEBSITE}
                    autoFocus
                    onChange={handleChange}
                />
            </InputContainer>
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
