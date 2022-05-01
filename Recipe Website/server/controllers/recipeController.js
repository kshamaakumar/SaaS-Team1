


/**
 * GET /
 *  Homepage
 */

exports.homepage = async(req,res) => {

    res.render('index',{ title:'Cook Right Away: Home'});


}