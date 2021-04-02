const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// NOTE: La fonction de nettoyage supprimera toutes les clés commençant par '$' dans l'entrée, vous pouvez donc la transmettre à MongoDB sans vous soucier des utilisateurs malveillants qui écrasent les sélecteurs de requête.
const sanitize = require('mongo-sanitize');

const User = require('../models/User');

// NOTE: Création des regex pour la Vérification du format de l'email et du mot de passe
// Le mot de passe nécessite une majuscule, une minuscule, de 7 à 15 caractères et au moins un caractère spécial suivants : ! @ # $ % ^ & *
let regexpPassword = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/); let emailFilter = new RegExp(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/);
let ok = true;


exports.signup = (req, res, next) => {
    // NOTE: Vérification du format de l'email et du mot de passe
    ok = ok && req.body && req.body.email;
    ok = ok && req.body && req.body.password;

    console.log("first ok : " + ok);
    console.log("current mail is : ", req.body.email);

    if (ok) {
        ok = ok && (req.body.email.length > 0);
        ok = ok && (req.body.password.length > 8);

        ok = ok && (regexpPassword.test(req.body.password));
        ok = ok && (emailFilter.test(req.body.email)) || (req.body.email * 1);

        console.log("second ok : " + ok);
        console.log("current mail is : ", req.body.email);

        if (ok) {
            // fin code vérif

            var clean = sanitize(req.body.email);
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        email: clean,
                        password: hash
                    });
                    user.save()
                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        };
    }
}

// NOTE: login > compare l'email saisi avec celui enregistré dans la BDD. Pareil pour le MdP
exports.login = (req, res, next) => {
    var clean = sanitize(req.body.email);
    User.findOne({ email: clean })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN_PASS,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
