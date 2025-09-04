export interface NameValidationResult {
  name: string;
  isReal: boolean;
  comment: string;
  cached?: boolean;
}

export async function validateName(name: string, sessionId?: string): Promise<NameValidationResult> {
  const response = await fetch('/api/validate-name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      name: name.trim(),
      sessionId: sessionId || generateSessionId()
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to validate name');
  }

  return await response.json();
}

export async function getSessionValidations(sessionId: string): Promise<NameValidationResult[]> {
  const response = await fetch(`/api/session/${sessionId}/validations`);
  
  if (!response.ok) {
    throw new Error('Failed to get session validations');
  }

  return await response.json();
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function getStoredUserData() {
  const name = localStorage.getItem('onamUserName');
  const validation = localStorage.getItem('onamNameValidation');
  
  if (name && validation) {
    return {
      name,
      validation: JSON.parse(validation) as NameValidationResult,
    };
  }
  
  return null;
}

export function clearStoredUserData() {
  localStorage.removeItem('onamUserName');
  localStorage.removeItem('onamNameValidation');
  localStorage.removeItem('onamSessionId');
}
