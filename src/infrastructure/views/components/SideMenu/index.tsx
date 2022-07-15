import React, { useState } from "react";
import MenuItem from "../MenuItem";
import "./styles.scss";

interface Option {
  text: string;
  selected?: boolean;
  redirectTo: string;
}

function SideMenu() {
  const menuOptions: Option[] = [
    {
      text: "Informações Gerais",
      selected: window.location.pathname.includes("general"),
      redirectTo: "/general",
    },
    // {
    //   text: "Consultas por Especialidade",
    //   selected: window.location.pathname.includes("appointments"),
    //   redirectTo: "/appointments",
    // },
    // {
    //   text: "Encaminhamentos",
    //   selected: window.location.pathname.includes("referrals"),
    //   redirectTo: "/referrals",
    // },
    {
      text: "Tempo de Fila",
      selected: window.location.pathname.includes("queue-time"),
      redirectTo: "/queue-time",
    },
  ];

  // const [menuOption, setMenuOption] = useState<Option[]>(menuOptions);

  return (
    <div id="side-menu">
      <div className="container-menu-header">
        <span className="menu-header">Informações</span>
      </div>
      {menuOptions.map((item, id) => (
        <div key={(id + 1).toString()}>
          <MenuItem
            id={id}
            text={item.text}
            selected={item.selected}
            redirectTo={item.redirectTo}
          />
        </div>
      ))}
    </div>
  );
}

export default SideMenu;
