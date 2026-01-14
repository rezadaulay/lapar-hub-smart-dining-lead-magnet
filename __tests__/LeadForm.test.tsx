import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LeadForm from "@/app/components/LeadForm";

/** * 1. FONT AWESOME MOCK
 * Icons often cause issues in Jest (SVG complexity). 
 * We replace them with a simple <span> to keep tests fast and stable.
 */
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="icon" />,
}));


describe("LeadForm Automation & AI Integration", () => {
  beforeEach(() => {
    // Clear mock history before each test to ensure fresh results
    jest.clearAllMocks();
  });

  /** --- TEST CASE: HAPPY PATH --- **/
  it("should submit data and show loading state before success", async () => {
    // Setup userEvent (better than fireEvent for simulating real user behavior)
    const user = userEvent.setup();
    render(<LeadForm />);

    // ACT: User fills out the form
    await user.type(screen.getByPlaceholderText(/e.g. John Doe/i), "Reza");
    await user.type(screen.getByPlaceholderText(/john@example.com/i), "reza@medan.com");
    // Select steak Cut 
    const steakSelect = screen.getByRole('combobox', { name: /Favorite Cut/i });
    await user.selectOptions(steakSelect, 'Juicy Ribeye');
    // Select doneness
    const donenessSelect = screen.getByRole('combobox', { name: /Doneness/i });
    await user.selectOptions(donenessSelect, 'Medium Rare');

    const submitBtn = screen.getByRole('button', { name: /CLAIM MY 50% VOUCHER NOW/i });
    
    // ACT: Click the submit button
    await user.click(submitBtn);

    
    /** * ASSERT: Verify Loading State
     * findByText is ASYNCHRONOUS. It waits for the element to appear.
     * This captures the 'status === submitting' phase.
     */
    expect(await screen.findByText('AI processing...')).toBeInTheDocument()

    // 4. Verifikasi Success UI (Setelah delay 2.5s di komponen selesai)
    // Gunakan timeout yang cukup (misal 4000ms)
    await waitFor(() => {
        expect(screen.getByText(/Check Your Inbox, Reza!/i)).toBeInTheDocument();
        expect(screen.getByText(/AI Insight:/i)).toBeInTheDocument();
    }, { timeout: 4000 });
  });

  /** --- TEST CASE: ERROR PATH --- **/
  it("should revert to idle status if the fetch fails", async () => {
    const user = userEvent.setup();
    
    // OVERRIDE MOCK: Force fetch to return 'ok: false' for this specific test
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );

    render(<LeadForm />);
    
    await user.type(screen.getByPlaceholderText(/e.g. John Doe/i), "Fail User");
    await user.click(screen.getByRole('button', { name: /CLAIM MY 50% VOUCHER NOW/i }));

    /** * ASSERT: Reversion to Idle
     * Verify that the button is enabled again (status reset) 
     * and the Success UI never rendered.
     */
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /CLAIM MY 50% VOUCHER NOW/i })).not.toBeDisabled();
      expect(screen.queryByText(/Check Your Inbox/i)).not.toBeInTheDocument();
    });
  });
});