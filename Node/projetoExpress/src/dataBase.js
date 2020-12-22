const sequence ={
    _id: 1,
    get id(){ return this._id++}
}

const produtos = {}

function salvarProduto(produto){
    if(!produto.id) produto.id = sequence.id
    produtos[produtos.id] = produto
    return produto
}

function getProduto(id){
    return produtos[id] || {}
}

function getProdutos(){
    return Object.values(produtos)
}

function delProduto(id){
    const produto = produto[id];
    delete produto[id];
    return produto
}
module.exports = {salvarProduto, getProduto, getProdutos, delProduto}