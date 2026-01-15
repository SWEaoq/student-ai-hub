import React, { useState } from 'react';
import { Sparkles, Loader2, Check, X } from 'lucide-react';
import { generateToolDescription, generateToolTagline, translateText, generatePromptText, generateIconSuggestion } from '../../lib/aiService';

/**
 * AIGenerator - Reusable AI content generation component
 * @param {Object} props
 * @param {string} props.type - Type of generation: 'description', 'tagline', 'translation', 'prompt', 'steps'
 * @param {Function} props.onGenerate - Callback with generated text
 * @param {Object} props.context - Context data (toolName, category, description, title, etc.)
 * @param {string} props.lang - Language ('en' or 'ar')
 * @param {string} props.label - Button label
 * @param {string} props.className - Additional CSS classes
 */
const AIGenerator = ({ 
    type, 
    onGenerate, 
    context = {}, 
    lang = 'en',
    label = null,
    className = '',
    disabled = false
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const getButtonLabel = () => {
        if (label) return label;
        
        // Short labels for compact buttons
        switch (type) {
            case 'description':
                return '🎯';
            case 'tagline':
                return '✨';
            case 'translation':
                return '🌐';
            case 'prompt':
                return '🤖';
            case 'steps':
                return '📝';
            case 'icon':
                return '🎨';
            default:
                return '✨';
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            let generatedText = '';

            switch (type) {
                case 'description':
                    if (!context.toolName || !context.category) {
                        throw new Error('Tool name and category are required');
                    }
                    generatedText = await generateToolDescription(
                        context.toolName,
                        context.category,
                        lang
                    );
                    break;

                case 'tagline':
                    if (!context.toolName) {
                        throw new Error('Tool name is required');
                    }
                    generatedText = await generateToolTagline(
                        context.toolName,
                        context.description || '',
                        lang
                    );
                    break;

                case 'translation':
                    if (!context.text) {
                        throw new Error('Text to translate is required');
                    }
                    generatedText = await translateText(context.text, lang);
                    break;

                case 'prompt':
                    if (!context.category || !context.title) {
                        throw new Error('Category and title are required');
                    }
                    generatedText = await generatePromptText(
                        context.category,
                        context.title,
                        lang
                    );
                    break;


                case 'icon':
                    if (!context.name || !context.description) {
                        throw new Error('Name and description are required for icon generation');
                    }
                    generatedText = await generateIconSuggestion(
                        context.name,
                        context.description
                    );
                    break;

                case 'steps':
                    // Dynamically import to avoid circular dependency issues if any,
                    // or just assume it's available in the imports (need to add import)
                    // Actually, I need to add generatePlaybookSteps to imports first.
                    if (!context.title || !context.category) {
                        throw new Error('Title and category are required');
                    }
                    // For steps, we return the object/array directly, not just text
                    generatedText = await import('../../lib/aiService').then(m => 
                        m.generatePlaybookSteps(context.title, context.category, lang)
                    );
                    break;

                default:
                    throw new Error('Invalid generation type');
            }

            if (onGenerate) {
                onGenerate(generatedText);
            }
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (err) {
            console.error('AI generation error:', err);
            let errorMessage = err.message || 'Failed to generate content';
            
            // Format error message for better display
            if (errorMessage.includes('quota') || errorMessage.includes('billing')) {
                errorMessage = errorMessage.split('\n\n').join('\n');
            }
            
            setError(errorMessage);
            // Show quota errors longer so user can read the instructions
            const timeout = errorMessage.includes('quota') || errorMessage.includes('billing') ? 15000 : 5000;
            setTimeout(() => setError(null), timeout);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`relative ${className}`}>
            <button
                type="button"
                onClick={handleGenerate}
                disabled={loading || disabled}
                className={`
                    flex items-center justify-center rounded-lg text-sm font-medium
                    transition-all duration-200 shrink-0
                    ${label ? 'w-auto px-4 py-2 gap-2' : 'w-10 h-10'}
                    ${loading || disabled
                        ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                        : success
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : error
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 hover:border-purple-500/50 hover:scale-105 active:scale-95'
                    }
                `}
                title={
                    error 
                        ? error 
                        : loading 
                        ? (lang === 'ar' ? 'جاري التوليد...' : 'Generating...')
                        : type === 'description'
                        ? (lang === 'ar' ? 'توليد الوصف' : 'Generate Description')
                        : type === 'tagline'
                        ? (lang === 'ar' ? 'توليد السطر' : 'Generate Tagline')
                        : type === 'translation'
                        ? (lang === 'ar' ? 'ترجمة' : 'Translate')
                        : type === 'steps'
                        ? (lang === 'ar' ? 'توليد الخطوات' : 'Generate Steps')
                        : type === 'icon'
                        ? (lang === 'ar' ? 'اقترح أيقونة' : 'Suggest Icon')
                        : (lang === 'ar' ? 'توليد' : 'Generate')
                }
            >
                {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                ) : success ? (
                    <Check size={18} />
                ) : error ? (
                    <X size={18} />
                ) : (
                    <span className={label ? 'text-sm font-bold' : 'text-lg'}>{getButtonLabel()}</span>
                )}
            </button>
            
            {error && (
                <div className="absolute top-full left-0 mt-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-xs text-red-400 max-w-md z-50 whitespace-pre-line shadow-xl">
                    <div className="font-semibold mb-1">Error:</div>
                    <div className="text-red-300">{error}</div>
                    {(error.includes('quota') || error.includes('billing')) && (
                        <div className="mt-2 pt-2 border-t border-red-500/20">
                            <a 
                                href="https://platform.openai.com/account/billing" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-red-300 hover:text-red-200 underline inline-flex items-center gap-1"
                            >
                                → Fix in OpenAI Dashboard
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AIGenerator;
