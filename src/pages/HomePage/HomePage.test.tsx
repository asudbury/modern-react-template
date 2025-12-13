import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';
import { AppProvider } from '../../context/AppContext';
import packageJson from '../../../package.json';

describe('HomePage', () => {
  const renderWithProviders = (component: React.ReactElement) => {
    return render(<AppProvider>{component}</AppProvider>);
  };

  it('renders the main heading', () => {
    renderWithProviders(<HomePage />);
    const heading = screen.getByRole('heading', {
      name: /modern react template/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    renderWithProviders(<HomePage />);

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();

    const h2Elements = screen.getAllByRole('heading', { level: 2 });
    expect(h2Elements.length).toBeGreaterThan(0);

    const h3Elements = screen.getAllByRole('heading', { level: 3 });
    expect(h3Elements.length).toBeGreaterThan(0);
  });

  it('has semantic main landmark', () => {
    renderWithProviders(<HomePage />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('renders action buttons with proper labels', () => {
    renderWithProviders(<HomePage />);

    const primaryButton = screen.getByRole('button', {
      name: /try primary button/i,
    });
    expect(primaryButton).toBeInTheDocument();

    const secondaryButton = screen.getByRole('button', {
      name: /try secondary button/i,
    });
    expect(secondaryButton).toBeInTheDocument();
  });

  it('displays feature cards', () => {
    renderWithProviders(<HomePage />);

    const accessibilityCard = screen.getByRole('heading', {
      name: /accessibility first/i,
    });
    expect(accessibilityCard).toBeInTheDocument();

    const typeSafetyCard = screen.getByRole('heading', {
      name: /type safety/i,
    });
    expect(typeSafetyCard).toBeInTheDocument();

    const performanceCard = screen.getByRole('heading', {
      name: /performance/i,
    });
    expect(performanceCard).toBeInTheDocument();
  });

  it('shows the template version in the footer', () => {
    renderWithProviders(<HomePage />);

    const versionText = screen.getByText(/template version/i);
    expect(versionText).toBeInTheDocument();

    const versionValue = screen.getByText(packageJson.version);
    expect(versionValue).toBeInTheDocument();
  });
});
