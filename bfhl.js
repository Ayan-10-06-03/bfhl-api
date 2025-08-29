// api/bfhl.js
// Serverless handler that works on Vercel. No extra packages needed.
// IMPORTANT: replace placeholders full_name, dob, email, roll_number below.

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ is_success: false, error: 'Only POST allowed' });
      return;
    }

    // Read raw body (serverless environment)
    let body = '';
    for await (const chunk of req) body += chunk;
    let parsed;
    try {
      parsed = body ? JSON.parse(body) : {};
    } catch (e) {
      res.status(400).json({ is_success: false, error: 'Invalid JSON' });
      return;
    }

    const input = Array.isArray(parsed.data) ? parsed.data : [];

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    input.forEach(item => {
      const s = String(item);

      // treat as integer number if string consists only of digits
      if (/^\d+$/.test(s)) {
        const num = parseInt(s, 10);
        sum += num;
        if (num % 2 === 0) even_numbers.push(s); // store original string
        else odd_numbers.push(s);                // store original string
      } else if (/^[A-Za-z]+$/.test(s)) {
        // only letters (single or multi-character), store uppercase
        alphabets.push(s.toUpperCase());
      } else {
        // anything else -> special characters (or mixed alphanumeric)
        special_characters.push(s);
      }
    });

    // concat alphabets (already uppercased), reverse characters, alternate caps starting UPPER
    const concatAll = alphabets.join('');
    const reversedChars = concatAll.split('').reverse();
    const concat_string = reversedChars
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join('');

    // ---------- EDIT THESE WITH YOUR INFO ----------
    const full_name = "aditya_ayan_singh"; // lowercase with underscores (e.g., aditya_ayan_singh)
    const dob = "10062003";                 // ddmmyyyy (e.g., 29082001)
    const email = "adityaayan.singh2026@gmail.com";
    const roll_number = "22BCE3372";
    // ----------------------------------------------

    const user_id = `${full_name}_${dob}`;

    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    });

  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message || String(err) });
  }
};
