import { useState, useCallback } from 'react';
import { Button } from '../../components/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@/components/shadcn';
import { SampleForm } from '../../../samples/components/SampleForm';
import { SampleDataFetching } from '../../../samples/components/SampleDataFetching';
import { SampleContextUsage } from '../../../samples/components/SampleContextUsage';
import { SampleAccessibility } from '../../../samples/components/SampleAccessibility';

/**
 * SamplesDemo Page
 *
 * A page to view and test all sample components.
 * This demonstrates how to use the samples directory during development.
 *
 * ⚠️ DELETE this file along with the samples/ directory before production!
 */

type SampleView = 'form' | 'data' | 'context' | 'accessibility' | null;

export function SamplesDemo() {
  const [activeView, setActiveView] = useState<SampleView>(null);

  const handleShowForm = useCallback(() => {
    setActiveView('form');
  }, []);

  const handleShowData = useCallback(() => {
    setActiveView('data');
  }, []);

  const handleShowContext = useCallback(() => {
    setActiveView('context');
  }, []);

  const handleShowAccessibility = useCallback(() => {
    setActiveView('accessibility');
  }, []);

  const handleBackToMenu = useCallback(() => {
    setActiveView(null);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-6">
          Sample Components Demo
        </h1>

        {!activeView ? (
          <Card>
            <CardHeader>
              <CardTitle>Choose a Sample to View</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-text-secondary mb-6">
                Click on any sample below to see it in action. These components
                demonstrate best practices for forms, data fetching, state
                management, and accessibility.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="primary"
                  onClick={handleShowForm}
                  size="lg"
                  fullWidth
                >
                  📝 Sample Form
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleShowData}
                  size="lg"
                  fullWidth
                >
                  🔄 Data Fetching
                </Button>
                <Button
                  variant="accent"
                  onClick={handleShowContext}
                  size="lg"
                  fullWidth
                >
                  📦 Context Usage
                </Button>
                <Button
                  variant="primary"
                  onClick={handleShowAccessibility}
                  size="lg"
                  fullWidth
                >
                  ♿ Accessibility
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="bg-error/10 border border-error rounded-md p-4">
                <p className="text-error font-semibold">
                  ⚠️ Remember to delete this page and the samples/ directory
                  before production!
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Button
              variant="secondary"
              onClick={handleBackToMenu}
              className="mb-6"
            >
              ← Back to Menu
            </Button>

            {activeView === 'form' && <SampleForm />}
            {activeView === 'data' && <SampleDataFetching />}
            {activeView === 'context' && <SampleContextUsage />}
            {activeView === 'accessibility' && <SampleAccessibility />}
          </>
        )}
      </div>
    </div>
  );
}
