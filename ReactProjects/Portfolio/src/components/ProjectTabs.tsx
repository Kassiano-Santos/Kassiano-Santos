import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import ReactProjectList from './ReactProjectList';
import JavaProjectList from './JavaProjectList';
import  styles  from "./ProjectTabs.module.css";

const ProjectTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      {/* Abas */}
      <Tabs 
        value={tabIndex} 
        onChange={handleChange}
        className= {styles.tabs}
        sx = {{ "& .MuiTab-root": {
          textAlign: "left", // alinha o texto à esquerda
          color: "#ddd", // cor padrão do texto
          fontWeight: "bold",
          textTransform: "none", // evita que o texto fique em caixa alta
          },
          "&& .Mui-selected": {
            color: "#45dca4",  // cor do texto da aba selecionada
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#45dca4", // cor da barrinha indicadora
          },
        }}
      >
        <Tab label="React / TypeScript" />
        <Tab label="Java" />
      </Tabs>

      {/* Conteúdo da aba React / TS */}
      {tabIndex === 0 && (
        <Box sx={{ mt: 2 }}>
          {/* Substitua por seus componentes ou cards de projetos React */}
          <ReactProjectList />
        </Box>
      )}

      {/* Conteúdo da aba Java */}
      {tabIndex === 1 && (
        <Box sx={{ mt: 2 }}>
          {/* Substitua por seus componentes ou cards de projetos Java */}
          <JavaProjectList />
        </Box>
      )}
    </Box>
  );
};

export default ProjectTabs;