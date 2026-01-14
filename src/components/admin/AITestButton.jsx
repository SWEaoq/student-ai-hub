import React, { useState } from 'react';
import { TestTube, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { testOpenAIConnection, printTestResults } from '../../utils/testOpenAI';

/**
 * AI Test Button - Test OpenAI API connection
 * Useful for debugging API key and quota issues
 */
const AITestButton = () => {
    const [testing, setTesting] = useState(false);
    const [results, setResults] = useState(null);

    const handleTest = async () => {
        setTesting(true);
        setResults(null);

        try {
            const testResults = await testOpenAIConnection();
            printTestResults(testResults);
            setResults(testResults);
        } catch (error) {
            setResults({
                testResult: 'ERROR',
                error: error.message,
                recommendations: ['Check browser console for details']
            });
        } finally {
            setTesting(false);
        }
    };

    return (
        <div className="mb-4 p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <TestTube size={18} className="text-purple-400" />
                    <h3 className="text-sm font-bold text-white">Test OpenAI Connection</h3>
                </div>
                <button
                    onClick={handleTest}
                    disabled={testing}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        testing
                            ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                >
                    {testing ? (
                        <>
                            <Loader2 size={16} className="inline animate-spin mr-2" />
                            Testing...
                        </>
                    ) : (
                        'Run Test'
                    )}
                </button>
            </div>

            {results && (
                <div className={`mt-3 p-3 rounded-lg border ${
                    results.testResult === 'SUCCESS'
                        ? 'bg-green-500/20 border-green-500/30 text-green-400'
                        : 'bg-red-500/20 border-red-500/30 text-red-400'
                }`}>
                    <div className="flex items-start gap-2 mb-2">
                        {results.testResult === 'SUCCESS' ? (
                            <CheckCircle size={18} className="mt-0.5" />
                        ) : (
                            <XCircle size={18} className="mt-0.5" />
                        )}
                        <div className="flex-1">
                            <div className="font-bold mb-1">
                                {results.testResult === 'SUCCESS' ? 'Connection Successful!' : 'Connection Failed'}
                            </div>
                            {results.apiKeyConfigured && (
                                <div className="text-xs opacity-75 mb-2">
                                    Key: {results.apiKeyPreview} (length: {results.apiKeyLength})
                                </div>
                            )}
                            {results.error && (
                                <div className="text-xs mb-2 whitespace-pre-line">
                                    {results.error}
                                </div>
                            )}
                            {results.recommendations && results.recommendations.length > 0 && (
                                <div className="text-xs mt-2">
                                    <div className="font-semibold mb-1">Recommendations:</div>
                                    <ul className="list-disc list-inside space-y-1">
                                        {results.recommendations.map((rec, i) => (
                                            <li key={i}>{rec}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AITestButton;
