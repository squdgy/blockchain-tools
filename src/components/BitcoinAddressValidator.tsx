'use client';

import { useState } from 'react';

interface ValidationResponse {
    is_valid: boolean;
    format?: string;
    network?: string;
}

export default function BitcoinAddressValidator() {
    const [address, setAddress] = useState('');
    const [result, setResult] = useState<ValidationResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('http://localhost:3001/api/validate-address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError('Failed to validate address. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Bitcoin Address Validator</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Enter Bitcoin Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a Bitcoin address"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {loading ? 'Validating...' : 'Validate Address'}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {result && (
                <div className={`mt-4 p-4 ${result.is_valid ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} border rounded-md`}>
                    <p className="font-medium">
                        {result.is_valid ? 'Valid Bitcoin Address' : 'Invalid Bitcoin Address'}
                    </p>
                    {result.is_valid && result.format && (
                        <p className="mt-2">Format: {result.format}</p>
                    )}
                    {result.is_valid && result.network && (
                        <p className="mt-1">Network: {result.network}</p>
                    )}
                </div>
            )}
        </div>
    );
} 