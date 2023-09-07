/////////////////////////////////////////////////////////////////////////////////////////////
//                               SERVIDOR EM NODE.JS                                       //
//                      Programado por Joao Victor Segantini.                              //
//                              GITHUB : CodedBytes                                        //
//                                 		                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////
// Server Port
const port = 2000;

// Frameworks e middlewares
const express = require("express");
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const { text } = require("body-parser");
const crypt = require('bcrypt');

// HTML Request scheduler
const app = express();

// DB Module
const conn = require('./exports/db');

// Apontamento de pastas a serem usadas pelo NODE.
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/js')));
app.use(express.static(path.join(__dirname, '/public/imgs')));
app.use(express.static(path.join(__dirname, '/public/_files')));
app.use(express.static(path.join(__dirname, '/public/pointers')));

// Sessão
app.use(session({
    secret: 'ivul08g5ujg8YH45OUGJMFPiejkmifh37r',
    resave: true,
    cookie: { maxAge: 9*60*60*1000 }, // session dura 9 hras.
    saveUninitialized: true,
}));

// Multer para salvar fotos / arquivos.
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/_files/photos/');// Diretorio para salvar as imagens    
    },
    filename: (req, file, callBack) => {// Nome do arquivo.
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({
    storage: storage
});

/////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////
//////////                              PAGE REQUESTS                            ////////////
/////////////////////////////////////////////////////////////////////////////////////////////
// Pagina inicial
app.get("/",(req, res)=>{
    if(!req.session.loggedin)
    {
        // Lista as noticias disponiveis
        conn.query("SELECT * FROM noticias ORDER BY Titulo",[],(error, results)=>{
            if(error) throw error;
            if(results.length > 0)
            {
                let data_brasileira = results[0].Data_Criacao.split('-').reverse().join('/');
                res.render(path.join(__dirname + '/public/pointers/index.ejs'),{result: 0, login: req.session.login, news: results, notices: 1, data: data_brasileira});
            } else {
                res.render(path.join(__dirname + '/public/pointers/index.ejs'),{result: 0, login: req.session.login, news: results, notices: 0});
            }
        });
    }
    else if(req.session.loggedin)
    {
        // Lista as noticias disponiveis
        conn.query("SELECT * FROM noticias ORDER BY Titulo",[],(error, results)=>{
            if(error) throw error;
            if(results.length > 0)
            {
                let data_brasileira = results[0].Data_Criacao.split('-').reverse().join('/');
                res.render(path.join(__dirname + '/public/pointers/index.ejs'),{result: 1,login: req.session.login, news: results, notices: 1, data: data_brasileira});
            } else {
                res.render(path.join(__dirname + '/public/pointers/index.ejs'),{result: 1, login: req.session.login, news: results, notices: 0});
            }
        });
    }
});

// Pagina de registro
app.get("/register",(req, res)=>{
    if(!req.session.loggedin) { res.render(path.join(__dirname + '/public/pointers/cadastro.ejs'),{result: 0}); }
    else if(req.session.loggedin) { res.redirect("/"); }
});

// Create news page
app.get("/create-news",(req, res)=>{
    if(!req.session.loggedin) { res.redirect("/"); }
    else if(req.session.loggedin) { res.render(path.join(__dirname + '/public/pointers/cadNews.ejs'),{result: 1, login: req.session.login}); }
});

// Funcionario logout
app.get("/logout",(req, res)=>{
    if(req.session.loggedin)
    {
        req.session.destroy();
        res.redirect("/");
    } else { res.redirect("/") }
});
/////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////
//////////                                   FORMS                               ////////////
/////////////////////////////////////////////////////////////////////////////////////////////
app.post("/doLogin",(req, res)=>{
    // Pegando usuario e senha
    var login = req.body.login, senha = req.body.senha;

    // Validando os campos 
    if((login.length >= 7 && senha.length >= 6) && (login.length <= 60 && senha.length <= 20))
    {    
        //Buscando na DB
        conn.query("SELECT * FROM usuarios WHERE Usuario=?;",[login],(error, results)=>{
            if(error) throw error;// Retorna erro.
            if(results.length > 0)
            {
                // Crypt encripta a senha bruta, e compara a hash com o do banco.
                if (crypt.compare(senha, results[0].Senha))
                {
                    req.session.loggedin = true;
                    req.session.login = results[0].Usuario;
                    res.redirect("/");
                } else {
                    // ativar div de msg
                    res.redirect("/");
                } 
            } else { res.redirect("/"); }
        });
    } else { res.redirect("/"); }
});

// Register
app.post("/regUser",(req, res)=>{
    // Pegando usuario e senha
    var login = req.body.usuario, senha = req.body.senhaa;

    // Validando os campos 
    if((login.length >= 6 && senha.length >= 6) && (login.length <= 60 && senha.length <= 20))
    {
        // Checa se já tem algum usuário cadastrado com o user passado.
        conn.query("SELECT * FROM usuarios WHERE Usuario=?",[login],(error,results)=>{
            if(error) throw error;// Retorna erro.
            if(results.length > 0)
            {
                // Fazer aparecer a div de aviso.
                res.redirect("/register");
            } else {
                // Aplicando hash na senha e gravando no banco
                crypt.hash(senha, 10, (error, hash)=>{
                    if(error) throw error;

                    // Query
                    conn.query("INSERT INTO usuarios (Usuario, Senha) VALUES (?, ?);",[login, hash],(error,results)=>{
                        if(error) throw error;
                        if(results.affectedRows > 0) { res.redirect("/"); }
                        else { res.redirect("/"); }
                    });
                });
            }
        });
    }
});

// Registrando nova notícia
app.post("/regNews", upload.single('image'),(req, res)=>{
    //Pegando campos
    let title = req.body.title, subTitle = req.body.subtitle, content = req.body.content;

    // verificando se os campos realmente estão preenchidos
    if(title.length > 0 && subTitle.length > 0 && content.length > 0)
    {
        // Checa se já existe essa notícia no banco de dados
        conn.query("SELECT * FROM noticias WHERE Titulo=? and subTitulo=?;",[title, subTitle],(error,results)=>{
            if(error) throw error;
            if(results.length > 0)
            {
                // mandar codigo de erro ou faz aparecer div.
                res.redirect("/create-news");
            } else {
                // Prossegue no cadastro da notícia.
                conn.query("INSERT INTO noticias (Autor, Titulo, subTitulo, Texto, Data_Criacao) VALUES (?, ?, ?, ?, CURDATE());",[req.session.login, title, subTitle, content],(error,results)=>{
                    if(error) throw error;
                    if(results.affectedRows > 0)
                    {
                        // Faz o processo de gravação da foto na noticia.
                        if (!req.file)
                        {
                            conn.query("UPDATE noticias SET Foto=? WHERE Autor=?;", ['', req.session.login],(error, results)=>{
                                if (error) throw error;
                                if(results.affectedRows > 0)
                                {
                                    res.redirect("/");
                                    console.log("Imagem zerada, usando imagem padrão...");
                                } else {
                                    // Retorna div de aviso de erro.
                                    res.redirect("/create-news");
                                }
                            });
                        } else {
                            var imgsrc = '/photos/' + req.file.filename;
                            conn.query("UPDATE noticias SET Foto=? WHERE Autor=?;", [imgsrc, req.session.login],(error, results)=>{
                                if (error) throw error;
                                if(results.affectedRows > 0)
                                {
                                    res.redirect("/");
                                    console.log("Upload realizado.");
                                } else {
                                    // Retorna div de aviso de erro.
                                    res.redirect("/create-news");
                                }
                            });
                        }
                    } else { throw error; }
                });
            }
        });
    }
});

// Função de pesquisa.
app.get("/search", (req, res)=>{
    // Pegando dados do form de pesquisa.
    let pesquisa = req.query.noticia;

    // Encontra as notícias com base na pesquisa.
    conn.query("SELECT * FROM noticias WHERE Titulo LIKE ? or subTitulo LIKE ? ORDER BY Titulo",["%" + pesquisa + "%", "%" + pesquisa + "%"],function(error,results,fields){
        if(error) throw error;
        if(results.length > 0)
        {
            if(!req.session.loggedin)
            {
                let data_brasileira = results[0].Data_Criacao.split('-').reverse().join('/');
                res.render(path.join(__dirname + '/public/pointers/index.ejs'),{result: 0, login: req.session.login, news: results, notices: 1, data: data_brasileira});
            }
            else if(req.session.loggedin)
            {
                let data_brasileira = results[0].Data_Criacao.split('-').reverse().join('/');
                res.render(path.join(__dirname + '/public/pointers/index.ejs'),{result: 0, login: req.session.login, news: results, notices: 1, data: data_brasileira});
            }
        } else { res.render(path.join(__dirname + '/public/pointers/index.ejs'),{result: 1, login: req.session.login, news: results, notices: 0}); }
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////     seta a porta do app    ////////////////////////////////
app.listen(port, ()=>{
    console.log('Servidor iniciado na porta : %d', port);
    if (process.send) { process.send('online'); }
});
/////////////////////////////////////////////////////////////////////////////////////////////