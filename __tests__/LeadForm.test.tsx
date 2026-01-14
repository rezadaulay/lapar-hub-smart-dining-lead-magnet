import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LeadForm from "@/app/components/LeadForm";
// Import the server action to be mocked
import { submitLeadAction } from "@/app/actions/lead";

/** * 1. MOCK SERVER ACTION
 * We instruct Jest to replace the real function with a mock implementation.
 * This prevents actual network calls during the testing phase.
 */
jest.mock("@/app/actions/lead", () => ({
  submitLeadAction: jest.fn(),
}));

/** * 2. FONT AWESOME MOCK 
 * We replace complex SVG icons with a simple span to prevent potential 
 * rendering errors or performance bottlenecks in the test environment.
 */
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="icon" />,
}));

describe("LeadForm with Server Actions Integration", () => {
  beforeEach(() => {
    // Clear mock history before each test to ensure test isolation
    jest.clearAllMocks();
  });

  it("should submit data via Server Action and show success message", async () => {
    const user = userEvent.setup();
    
    /** * 3. MOCK SUCCESS RESPONSE
     * Simulate a 100ms delay to allow the 'submitting' status to be visible to the test.
     */
    (submitLeadAction as jest.Mock).mockImplementation(() => 
      new Promise((resolve) => 
        setTimeout(() => resolve({ 
          success: true, 
          aiInsight: "Mocked Insight: Ribeye is best served Medium Rare!" 
        }), 100)
      )
    );

    render(<LeadForm />);

    // 1. Fill Text Inputs
    await user.type(screen.getByPlaceholderText(/e.g. John Doe/i), "Reza");
    await user.type(screen.getByPlaceholderText(/john@example.com/i), "reza@medan.com");
    
    // 2. Select Steak Cut (Accessible via linked labels for accessibility testing)
    const steakSelect = screen.getByRole('combobox', { name: /Favorite Cut/i });
    await user.selectOptions(steakSelect, 'Juicy Ribeye');

    // 3. Select Doneness
    const donenessSelect = screen.getByRole('combobox', { name: /Doneness/i });
    await user.selectOptions(donenessSelect, 'Medium Rare');

    // 4. Trigger Submit
    const submitBtn = screen.getByRole('button', { name: /CLAIM MY 50% VOUCHER NOW/i });
    await user.click(submitBtn);

    // 5. Verify Loading State
    // findByText waits for the element to appear in the DOM
    expect(await screen.findByText('AI processing...')).toBeInTheDocument();

    /** * 6. VERIFY ACTION CALL
     * Ensure the Server Action was invoked with the exact payload 
     * captured from the form fields.
     */
    await waitFor(() => {
      expect(submitLeadAction).toHaveBeenCalledWith(expect.objectContaining({
        name: "Reza",
        email: "reza@medan.com",
        steak: "Juicy Ribeye",
        doneness: "Medium Rare"
      }));
    });

    // 7. Verify Success UI & AI Insight rendering
    await waitFor(() => {
        expect(screen.getByText(/Check Your Inbox, Reza!/i)).toBeInTheDocument();
        expect(screen.getByText(/Mocked Insight: Ribeye is best served Medium Rare!/i)).toBeInTheDocument();
    }, { timeout: 4000 });
  });

  it("should revert to idle if Server Action returns an error", async () => {
    const user = userEvent.setup();
    
    /** * 8. MOCK ERROR RESPONSE
     * Simulate a failed server-side scenario.
     */
    (submitLeadAction as jest.Mock).mockResolvedValue({ 
      success: false, 
      error: "Server Error" 
    });

    render(<LeadForm />);
    
    await user.click(screen.getByRole('button', { name: /CLAIM MY 50% VOUCHER NOW/i }));

    /** * 9. VERIFY REVERSION
     * The button should be re-enabled to allow another attempt, 
     * and the success message should not be visible.
     */
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /CLAIM MY 50% VOUCHER NOW/i })).not.toBeDisabled();
      expect(screen.queryByText(/Check Your Inbox/i)).not.toBeInTheDocument();
    });
  });
});