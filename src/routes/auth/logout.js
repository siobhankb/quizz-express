module.exports = async (req, res) => {
    // clear JWT cookie
    res.cookie('jwtToken', '', { maxAge: 90000, httpOnly: true })
    res.redirect('/')
}