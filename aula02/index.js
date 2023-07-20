/* 
    0 - obter um usuario
    1 - obter o numero de telefone de um usuario a partir de se ID
    2 - obter o endereço do usuario pelo ID
*/

function obterUsuario() {
    return new Promise(
        function resolvePromise(resolve, reject) {     
            setTimeout(function() {
                return resolve({
                    id: 1,
                    nome: 'Isabella',
                    dataNascimento: new Date('05/05/2009')
                })
        }, 1000)
    })
}

function obterTelefone(id) {
    return new Promise(
        function resolvePromise(resolve, reject) {            
            setTimeout(() => {
                return {
                    telefone: '1234567',
                    ddd: 61
                }
            }, 2000)
        }
    )
}

function obterEndereco(id) {
    setTimeout(() => {
        return callback(null, {
            rua: 'não sei',
            numero: 12
        })
    })
}

const usuarioPromise = obterUsuario();

usuarioPromise
    .then(
        function (usuario) {
            return obterTelefone(usuario.id)
            .then(
                function resolverTelefone(result) {
                    return{
                        usuario: {
                            id: usuario.id,
                            nome: usuario.nome            
                        },
                        telefone: result
                    }
                }
            )
        }
    )
    .then(
        function (resultado) {
            const endereco = obterEnderecoAsync(resultado.usuario.id);
            return endereco.then(
                function resolverEndereco(result) {
                    return{
                        usuario: resultado.usuario,
                        telefone: resultado.telefone,
                        endereco: resultado.endereco
                    }
                }
            )
        }
    )
    .then(
        function (resultado) {
            console.log(`
                Nome: ${resultado.usuario.nome}
                Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
                Telefone:( ${resultado.telefone.ddd}) ${resultado.telefone.telefone}
            `);
        }
    )
    .catch(
        function (error) {
            console.error("error", error);
        }
    )

// para manipular o sucesso usamos a função .then()
// para manipular o erro usamos .catch();

// function resolverUsuario(erro, usuario) {
//     console.log('usuario', usuario);
// }

// obterUsuario(usuario.id, function resolverUsuario(error, usuario){
//     // null || "" || 0 === false
//     if (error) {
//         console.error('deu ruim em usuario', error)
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if (error1) {
//             console.error('deu ruim em telefone', error);
//             return;
//         }

//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if (error2) {
//                 console.error('deu ruim em endereço', error);
//                 return;
//             }
    
//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endereço: ${endereco.rua}, ${endereco.numero},
//                 Telefone: (${telefone.ddd}) ${telefone.telefone}
//             `)
//         })
//     })

// })

// const telefone = obterTelefone(usuario.id);
// console.log('telefone: ',telefone)