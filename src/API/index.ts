export const BASE_URL = '../../../';
export const API = {
  login: async (email: string, senha: string) => {
    let response = await fetch(`${BASE_URL}escola/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password: senha
      })
    });
    return await response.json();
  },
  
  cadastrar: async (email: string, senha: string, nome: string, telefone?: string) => {
    let response = await fetch(`${BASE_URL}escola/cadastrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password: senha,
        nome,
        telefone
      })
    });
    return await response.json();
  },
  
  getCursos: async (status: string, categoria?: string) => {
    let response;
    if (categoria) {
      response = await fetch(`${BASE_URL}escola/cursos/${status}/${categoria}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      response = await fetch(`${BASE_URL}escola/cursos/${status}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return await response.json();
  },
  
  getCurso: async (uuid: string) => {
    let response = await fetch(`${BASE_URL}escola/curso/${uuid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  },
  
  getCategorias: async () => {
    let response = await fetch(`${BASE_URL}escola/categorias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  },
  
  getSobre: async () => {
    let response = await fetch(`${BASE_URL}escola/sobre`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  },
  
  getContato: async () => {
    let response = await fetch(`${BASE_URL}escola/contato`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  },
  
  sendContato: async (nome: string, email: string, assunto: string, mensagem: string) => {
    let response = await fetch(`${BASE_URL}escola/contato`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome,
        email,
        assunto,
        mensagem
      })
    });
    return await response.json();
  },
  
  inscrever: async (user_uuid: string, curso_uuid: string) => {
    let response = await fetch(`${BASE_URL}escola/inscricao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_uuid,
        curso_uuid
      })
    });
    return await response.json();
  },
  
  checkInscrito: async (user_uuid: string, curso_uuid: string) => {
    let response = await fetch(`${BASE_URL}escola/checkinscrito`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_uuid,
        curso_uuid
      })
    });
    return await response.json();
  }
}