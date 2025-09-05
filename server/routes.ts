import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js"; // ✅ added .js
import { insertNameValidationSchema } from "../shared/schema.js"; // ✅ fixed alias
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Name validation endpoint
  app.post("/api/validate-name", async (req, res) => {
    try {
      const { name, sessionId } = req.body;

      if (!name || typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({
          error: "Name must be at least 2 characters long",
        });
      }

      const trimmedName = name.trim();

      // Check if we already validated this name
      const existingValidation = await storage.getNameValidation(trimmedName);
      if (existingValidation) {
        return res.json({
          name: existingValidation.name,
          isReal: existingValidation.isReal,
          comment: existingValidation.comment,
          cached: true,
        });
      }

      // Validate the name
      const isReal = validateNameLogic(trimmedName);
      const comment = generateHumorousComment(trimmedName, isReal);

      // Store the validation result
      const validation = await storage.createNameValidation({
        name: trimmedName,
        isReal,
        comment,
        sessionId: sessionId || null,
      });

      res.json({
        name: validation.name,
        isReal: validation.isReal,
        comment: validation.comment,
        cached: false,
      });
    } catch (error) {
      console.error("Name validation error:", error);
      res.status(500).json({
        error: "Failed to validate name",
      });
    }
  });

  // Get user's validation history
  app.get("/api/session/:sessionId/validations", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const validations = await storage.getNameValidationsBySession(sessionId);
      res.json(validations);
    } catch (error) {
      console.error("Session validation error:", error);
      res.status(500).json({
        error: "Failed to retrieve validations",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Name validation logic
function validateNameLogic(name: string): boolean {
  const commonRealNames = [
    "john", "jane", "alex", "sarah", "mike", "lisa", "david", "anna",
    "raj", "priya", "rahul", "kavya", "arjun", "maya", "rohan", "sneha",
    "aarav", "ananya", "ishaan", "tara", "vikram", "pooja", "karan", "riya",
  ];

  const lowerName = name.toLowerCase();
  if (commonRealNames.includes(lowerName)) {
    return true;
  }

  const fakePatterns = [
    /^test/i, /^fake/i, /^demo/i, /^sample/i, /^user/i, /^admin/i,
    /^guest/i, /^temp/i, /^placeholder/i, /^example/i, /^default/i,
    /123/, /abc/, /xyz/, /qwerty/i, /asdf/i, /^a+$/, /^x+$/,
  ];

  if (fakePatterns.some((pattern) => pattern.test(name))) {
    return false;
  }

  const hasReasonableLength = name.length >= 2 && name.length <= 25;
  const hasValidCharacters = /^[a-zA-Z\s\-'\.]+$/.test(name);
  const notAllSameChar = !/^(.)\1+$/.test(name);

  return hasReasonableLength && hasValidCharacters && notAllSameChar;
}

// Generate humorous comments
function generateHumorousComment(name: string, isReal: boolean): string {
  if (isReal) {
    const realNameComments = [
      `King Mahabali is impressed! "${name}" sounds like a name worthy of the royal court! 👑`,
      `Excellent choice, ${name}! Your parents clearly had good taste in names. The king approves! ✨`,
      `${name}, what a beautiful name! Even the Devas are nodding in approval! 🌟`,
      `Wonderful! ${name} has such a melodious ring to it - perfect for the Onam festivities! 🎵`,
      `${name}, your name carries the wisdom of ages. King Mahabali welcomes you with open arms! 🤗`,
    ];
    return realNameComments[Math.floor(Math.random() * realNameComments.length)];
  } else {
    const fakeNameComments = [
      `"${name}"? Really? 😏 King Mahabali has seen many creative names in his time, but this one takes the crown! Still, you're welcome! 👑`,
      `Ah "${name}", how... unique! 🤔 The king appreciates creativity, even in nomenclature! Welcome to the party! 🎉`,
      `"${name}" - now that's what we call thinking outside the coconut! 🥥 Mahabali laughs heartily and welcomes you anyway! 😄`,
      `Creative name choice, "${name}"! 🎭 Did you perhaps consult the royal jester for naming advice? Either way, the celebration continues! 🎊`,
      `"${name}"... interesting! 🧐 King Mahabali has ruled for eons and has never heard that one before! Points for originality! ⭐`,
      `Well hello there, "${name}"! 😂 That's either a very avant-garde name or someone got creative at the keyboard! Welcome regardless! 🌸`,
    ];
    return fakeNameComments[Math.floor(Math.random() * fakeNameComments.length)];
  }
}
