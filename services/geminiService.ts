import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const sendMessageToGemini = async (
  message: string, 
  history: ChatMessage[] = [],
  providedApiKey?: string
): Promise<string> => {
  
  // Priority: 
  // 1. Key provided from Admin Panel (via argument)
  // 2. Key from environment variable (fallback)
  let apiKey = providedApiKey;

  if (!apiKey) {
    try {
        // @ts-ignore
        apiKey = process.env.API_KEY;
    } catch (e) {
        // Ignore env error
    }
  }

  // If still no key, return error
  if (!apiKey) {
    return "Konfigurasi AI belum lengkap. Harap hubungi Admin untuk mengatur API Key di Panel Admin.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `Anda adalah Asisten Virtual Cerdas untuk "Apps PDB" (Pembelajaran Dasar Bersama) Universitas Airlangga.
        
Tugas anda:
1. Membantu pengguna (Dosen, Mahasiswa, Staff) menavigasi aplikasi (SIMPDB, Helpdesk, Ruang, Repository).
2. Menjawab pertanyaan terkait pendidikan karakter, kebangsaan, dan jadwal PDB.
3. Bersikap sopan, formal namun ramah, dan solutif.
4. Jika ditanya hal teknis di luar PDB, jawab secara umum atau arahkan ke Helpdesk.

Konteks Aplikasi:
- SIMPDB: Untuk plotting dosen dan jadwal.
- Helpdesk: Untuk komplain dan izin mahasiswa.
- Ruang PDB: Peminjaman ruang kelas.
- Repository: Arsip digital.`,
      },
    });

    return response.text || "Maaf, saya tidak dapat menghasilkan respon saat ini.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Maaf, terjadi kesalahan saat menghubungi layanan AI. Periksa koneksi atau validitas API Key.";
  }
};