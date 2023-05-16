package br.com.uinvest.bo;

import br.com.uinvest.connection.Conexao;
import br.com.uinvest.controller.UsuarioController;
import br.com.uinvest.dao.UsuarioDAO;
import br.com.uinvest.model.Usuario;
import com.google.gson.Gson;

import java.sql.Connection;

public class UsuarioBO {
    private UsuarioDAO ud;
    private UsuarioController uc;

    public String exibirDadosUsuarioBo(){
        Connection con = Conexao.abrirConexao();
        ud = new UsuarioDAO(con);
        Gson gson = new Gson();
        String json = gson.toJson(ud.exibirDadosUsuario());
        return json;
    }

    public boolean cadastrarUsuarioBo(Usuario usuario) {
        String mockJson = "{" +
                "'nome': 'Nome do Usuário'," +
                "'email': 'email@example.com'," +
                "'senha': 'senha123'," +
                "'nickName': 'Apelido'," +
                "'celular': '1234567890'," +
                "'cpf': '12345678901'," +
                "'nascimento': '01012000'," +
                "'perfil_investidor': 'Conservador'," +
                "'saldo': 1000" +
                "}";
        Connection con = Conexao.abrirConexao();
        uc = new UsuarioController();

        return uc.cadastrarUsuarioFront(mockJson);
    }



}