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

export async function getAllApplications({ page = 1, limit = 20, search = "" } = {}) {
  const offset = (page - 1) * limit;

  const applications = await sql`
    SELECT * FROM applications
    WHERE ${search} = '' OR
      title ILIKE ${"%" + search + "%"} OR
      company ILIKE ${"%" + search + "%"} OR
      location ILIKE ${"%" + search + "%"}
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  const [{ count }] = await sql`
    SELECT COUNT(*) FROM applications
    WHERE ${search} = '' OR
      title ILIKE ${"%" + search + "%"} OR
      company ILIKE ${"%" + search + "%"} OR
      location ILIKE ${"%" + search + "%"}
  `;

  return {
    data: applications,
    total: parseInt(count),
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(count / limit)),
  };
}
