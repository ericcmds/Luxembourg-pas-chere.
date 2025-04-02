import React, { useState } from 'react';
import { useClaude, generateDesignSystem, generateWebsiteDesignSuggestions, generateAnimationSuggestions, generateResponsiveDesignSuggestions } from '../integration/AnthropicAPI';
import { Button } from "@/components/ui/button";
import { Loader, AlertCircle, Check, Copy, ExternalLink, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the component props
interface ClaudeDesignAssistantProps {
  initialDescription?: string;
}

/**
 * ClaudeDesignAssistant Component
 * 
 * This component allows users to get website design suggestions using
 * the Anthropic Claude API. Users can select different design tools and 
 * receive intelligent design recommendations.
 */
export default function ClaudeDesignAssistant({ initialDescription = '' }: ClaudeDesignAssistantProps) {
  const [description, setDescription] = useState(initialDescription);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('design-system');
  const { toast } = useToast();

  // Function to generate content based on selected tool
  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      let response;
      
      switch (activeTab) {
        case 'design-system':
          response = await generateDesignSystem(description);
          break;
        case 'design-suggestions':
          response = await generateWebsiteDesignSuggestions(description);
          break;
        case 'animations':
          response = await generateAnimationSuggestions(description);
          break;
        case 'responsive':
          response = await generateResponsiveDesignSuggestions(description);
          break;
        default:
          response = await generateDesignSystem(description);
      }
      
      if (response.success) {
        setResult(response.text);
        toast({
          title: "Design generated successfully",
          description: "Scroll down to see the results",
          variant: "default"
        });
      } else {
        setError(response.error?.message || 'Failed to generate design');
        
        // Check if the error is due to missing API key
        if (response.error?.type === 'api_key_missing') {
          toast({
            title: 'API Key Required',
            description: 'Please add your Anthropic Claude API key to the environment variables.',
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
            description: 'Design content has been copied to clipboard',
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

  const getPromptPlaceholder = () => {
    switch (activeTab) {
      case 'design-system':
        return "Describe your brand values, target audience, and design preferences for a complete design system...";
      case 'design-suggestions':
        return "Describe the specific page or component you need design suggestions for...";
      case 'animations':
        return "Describe the element you want to animate (e.g., buttons, cards, navigation menu)...";
      case 'responsive':
        return "Describe the component that needs responsive design improvements...";
      default:
        return "Describe your website needs...";
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'design-system':
        return "Complete Design System";
      case 'design-suggestions':
        return "Design Suggestions";
      case 'animations':
        return "Animation Ideas";
      case 'responsive':
        return "Responsive Design";
      default:
        return "Design Assistant";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Wand2 className="text-primary h-6 w-6" />
        <h2 className="text-2xl font-bold">Claude Design Assistant</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Powered by Anthropic Claude 3.5 Sonnet. Select a design tool and describe what you need to generate professional design recommendations.
      </p>
      
      <Tabs defaultValue="design-system" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="design-system">Design System</TabsTrigger>
          <TabsTrigger value="design-suggestions">Design Ideas</TabsTrigger>
          <TabsTrigger value="animations">Animations</TabsTrigger>
          <TabsTrigger value="responsive">Responsive</TabsTrigger>
        </TabsList>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">{getTabTitle()}</h3>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
              <AlertCircle className="text-red-500 mt-0.5" size={16} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              className="w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={5}
              placeholder={getPromptPlaceholder()}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !description.trim()}
            className="w-full flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader className="animate-spin" size={16} />
                Generating with Claude...
              </>
            ) : (
              <>
                <Wand2 size={16} />
                Generate {getTabTitle()}
              </>
            )}
          </Button>
        </div>
      </Tabs>
      
      {result && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{getTabTitle()} Results</h3>
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
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 prose prose-sm max-w-none overflow-auto max-h-[500px]">
            {result.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
        <p>Note: This tool requires an Anthropic Claude API key in your environment variables.</p>
        <p className="mt-1">Get an API key from the <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Anthropic Console</a>.</p>
      </div>
    </div>
  );
}