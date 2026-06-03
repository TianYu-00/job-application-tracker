import sql from "./client.js";

export async function insertApplication(data) {
  const { url, title = null, company = null, location = null, description = null } = data;

  const [row] = await sql`
    INSERT INTO applications (url, title, company, location, description)
    VALUES (${url}, ${title}, ${company}, ${location}, ${description})
    RETURNING *
  `;

  return row;
}

export async function getAllApplications() {
  return await sql`SELECT * FROM applications ORDER BY created_at DESC`;
}
