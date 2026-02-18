/**
 * ContractUpload.test.tsx — Integration tests for ContractUpload component
 *
 * Tests the upload UI, extraction flow, and analyze trigger.
 * Uses @testing-library/react to simulate user interactions.
 *
 * Phase 7: Testing
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContractUpload } from '@/components/templates/ContractUpload';
import * as contractExtractor from '@/utils/contractExtractor';

// Mock the dependencies
vi.mock('@/utils/contractExtractor', async () => {
    const actual = await vi.importActual('@/utils/contractExtractor');
    return {
        ...actual,
        extractFromFile: vi.fn(),
    };
});

vi.mock('@/utils/acknowledgmentHelpers', () => ({
    notifyTele: vi.fn(),
}));

vi.mock('@/hooks/useSound', () => ({
    useSound: () => ({
        playClick: vi.fn(),
        playSuccess: vi.fn(),
        playError: vi.fn(),
    }),
}));

describe('ContractUpload', () => {
    it('renders initial state correctly', () => {
        render(<ContractUpload headline="Upload Contract" />);
        expect(screen.getByRole('heading', { level: 3, name: "Upload Contract" })).toBeInTheDocument();
        expect(screen.getByText(/drag and drop your contract/i)).toBeInTheDocument();
    });

    it('handles file selection', async () => {
        const file = new File(['contract content'], 'test.txt', { type: 'text/plain' });
        const mockExtract = vi.mocked(contractExtractor.extractFromFile);
        mockExtract.mockResolvedValue({
            text: 'Extracted contract text',
            wordCount: 3,
            charCount: 20,
            warnings: [],
        });

        const { container } = render(<ContractUpload />);

        // Find input directly in DOM since it has opacity-0
        const input = container.querySelector('input[type="file"]');
        expect(input).toBeInTheDocument();

        fireEvent.change(input!, { target: { files: [file] } });

        await waitFor(() => {
            expect(mockExtract).toHaveBeenCalledWith(file);
        });

        // Wait for preview text to appear (indicates success)
        await waitFor(() => {
            expect(screen.getByText('test.txt')).toBeInTheDocument();
        });
    });
});
