import {Autocomplete, Grid, TextField} from "@mui/material";
import {Curso} from "../../components";
import {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {API} from "../../API";
import {useEffectOnce} from "usehooks-ts";
import {useNavigate} from "react-router";

type CursoType = {
  uuid: string,
  foto: {
    media: string
  },
  titulo: string,
  prazo: string,
  descricao: string
}

interface CategoriaType {
  uuid: string,
  nome: string
}

export const Inicio = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState<Array<CursoType>>([]);
  const [categorias, setCategorias] = useState<Array<CategoriaType>>([]);
  const [categoria, setCategoria] = useState<CategoriaType>({uuid: '', nome: 'Todas'})
  const [status, setStatus] = useState<CategoriaType>({uuid: 'aberto', nome: 'Aberto'})
  const {enqueueSnackbar} = useSnackbar();
  
  const getCursos = async (status: string, categoria?: string) => {
    try {
      let resposta = await API.getCursos(status, categoria);
      if (!resposta.error) {
        setCursos(resposta.data);
      } else {
        enqueueSnackbar(resposta.error.description, {variant: "error"});
      }
    } catch (e) {
      enqueueSnackbar(`${e}`, {variant: "error"});
    }
  }
  
  const getCategorias = async () => {
    try {
      let resposta = await API.getCategorias();
      if (!resposta.error) {
        let tempArr: Array<CategoriaType> = [];
        tempArr.push({uuid: '', nome: 'Todas'})
        resposta.data.forEach((item: CategoriaType) => {
          let tempItem: CategoriaType = {uuid: item.uuid, nome: item.nome};
          tempArr.push(tempItem);
        });
        setCategorias(tempArr);
      } else {
        enqueueSnackbar(resposta.error.description, {variant: "error"});
      }
    } catch (e) {
      enqueueSnackbar(`${e}`, {variant: "error"});
    }
  }
  
  useEffectOnce(() => {
    getCategorias();
  });
  
  useEffect(() => {
    getCursos(status.uuid, categoria.uuid);
  }, [categoria, status]);
  
  const changeCurso = (value: CursoType | null) => {
    if (value && value.uuid) {
      navigate(`/detalhes/${value.uuid}`);
    }
  }
  
  const changeCategoria = (value: CategoriaType | null) => {
    if (value) {
      setCategoria(value);
    }
  }
  
  return (
    <div className={"app-inicio"}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3}>
          {cursos.length > 0 &&
            <Autocomplete
              disablePortal
              autoComplete
              id="combo-box-demo"
              options={cursos.map((item) => (item))}
              onChange={(e: any, valor: CursoType | null) => {
                changeCurso(valor)
              }}
              getOptionLabel={(option: CursoType) => option.titulo}
              renderOption={(props, option: CursoType) => {
                return (
                  <li {...props} key={option.uuid}>
                    {option.titulo}
                  </li>
                );
              }}
              size={"small"}
              fullWidth
              renderInput={(params) => <TextField margin={"normal"} {...params}
                                                  label="Busca"/>}
            />
          }
          {categorias.length > 0 &&
              <Autocomplete
                  disablePortal
                  autoComplete
                  disableClearable
                  isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                  id="combo-box-demo"
                  options={categorias.map((item) => ({uuid: item.uuid, nome: item.nome}))}
                  value={categoria}
                  onChange={(e: any, valor: CategoriaType | null) => {
                    changeCategoria(valor)
                  }}
                  getOptionLabel={(option: CategoriaType) => option.nome}
                  renderOption={(props, option: CategoriaType) => {
                    return (
                      <li {...props} key={option.uuid}>
                        {option.nome}
                      </li>
                    );
                  }}
                  size={"small"}
                  fullWidth
                  renderInput={(params) => <TextField margin={"normal"} focused {...params}
                                                      label="Categoria"/>}
              />
          }
          
          <Autocomplete
            disablePortal
            autoComplete
            disableClearable
            isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
            id="combo-box-aberto"
            options={[{uuid: 'aberto', nome: 'Aberto'}, {uuid: 'encerrado', nome: 'Encerrado'}]}
            value={status}
            onChange={(e: any, valor: CategoriaType | null) => {
              if (valor) {
                setStatus(valor)
              }
            }}
            getOptionLabel={(option: CategoriaType) => option.nome}
            renderOption={(props, option: CategoriaType) => {
              return (
                <li {...props} key={option.uuid}>
                  {option.nome}
                </li>
              );
            }}
            size={"small"}
            fullWidth
            renderInput={(params) => <TextField margin={"normal"} focused {...params}
                                                label="Status"/>}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Grid container spacing={1}>
            {cursos.length > 0 &&
              cursos.map((item, index) => (
                <Grid key={index} item sm={12} md={6} lg={4}>
                  <Curso item={item}/>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}