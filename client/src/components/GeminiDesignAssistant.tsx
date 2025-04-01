import React, { useState } from 'react';
import { useGemini, generateWebsiteDesignSuggestions } from '../integration/GeminiAPI';
import { Button } from "@/components/ui/button";
import { Loader, AlertCircle, Check, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define the component props
interface GeminiDesignAssistantProps {
  initialDescription?: string;
}

/**
 * GeminiDesignAssistant Component
 * 
 * This component allows users to get website design suggestions using
 * the Google Gemini API. Users can input a description and receive
 * design recommendations in response.
 */
export default function GeminiDesignAssistant({ initialDescription = '' }: GeminiDesignAssistantProps) {
  const [description, setDescription] = useState(initialDescription);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to generate design suggestions
  const handleGenerateSuggestions = async () => {
    if (!description.trim()) {
      setError('Please enter a website description');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await generateWebsiteDesignSuggestions(description);
      
      if (response.success) {
        setResult(response.text);
      } else {
        setError(response.error?.message || 'Failed to generate design suggestions');
        
        // Check if the error is due to missing API key
        if (response.error?.type === 'api_key_missing') {
          toast({
            title: 'API Key Required',
            description: 'Please add your Google Gemini API key to the environment variables.',
            variant: 'destructive'
          });
        }
      }
    } catch (err: any) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to copy result to clipboard
  const handleCopyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result)
        .then(() => {
          toast({
            title: 'Copied to clipboard',
            description: 'Design suggestions have been copied to clipboard',
            variant: 'default'
          });
        })
        .catch(err => {
          toast({
            title: 'Failed to copy',
            description: 'Could not copy text to clipboard',
            variant: 'destructive'
          });
        });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Website Design Assistant</h2>
      <p className="text-gray-600 mb-6">
        Powered by Google Gemini Flash AI. Enter a description of your website needs and get professional design suggestions.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
          <AlertCircle className="text-red-500 mt-0.5" size={16} />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Website Description
        </label>
        <textarea
          id="description"
          className="w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-primary focus:border-transparent"
          rows={5}
          placeholder="Describe your website needs, target audience, and any design preferences..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      
      <div className="mb-6">
        <Button 
          onClick={handleGenerateSuggestions} 
          disabled={isGenerating || !description.trim()}
          className="w-full flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader className="animate-spin" size={16} />
              Generating Suggestions...
            </>
          ) : (
            <>
              <ExternalLink size={16} />
              Get Design Suggestions
            </>
          )}
        </Button>
      </div>
      
      {result && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Design Suggestions</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopyToClipboard}
              className="flex items-center gap-1"
            >
              <Copy size={14} />
              Copy
            </Button>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 whitespace-pre-wrap overflow-auto max-h-[400px]">
            {result}
          </div>
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
        <p>Note: You'll need to add a Google Gemini API key to your environment variables to use this feature.</p>
        <p className="mt-1">Get an API key from the <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google AI Studio</a>.</p>
      </div>
    </div>
  );
}