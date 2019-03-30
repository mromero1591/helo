SELECT
    username,
    profile_pic
FROM
    users
WHERE
    username = $1;