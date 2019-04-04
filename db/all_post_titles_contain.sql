SELECT 
    p.id,
    p.title,
    p.img,
    p.content,
    u.username,
    u.profile_pic
FROM
    posts AS p
    JOIN users AS u ON (p.author_id = u.id)
WHERE
    p.title ILIKE $1