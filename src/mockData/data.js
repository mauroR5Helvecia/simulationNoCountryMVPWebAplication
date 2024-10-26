export const NavBarMenu = [
    {
        id: 1,
        title: "Nosotros",
        enumServicio: null,  
        link: "/sobreNosotros" 
    },
    {
        id: 2,
        title: "Contacto",
        enumServicio: null,  
        link: "/contacto" 
    },
    {
        id: 3,
        title: "Guarderias",
        enumServicio: "GUARDERIAS",
        link: `/servicios/${"GUARDERIAS".toLowerCase().replace(/\s+/g, '')}`
    },
    {
        id: 4,
        title: "Transporte",
        enumServicio: "TRANSPORTE_DE_MASCOTAS",
        link: `/servicios/${"TRANSPORTE_DE_MASCOTAS".toLowerCase().replace(/\s+/g, '')}`
    },
    {
        id: 5,
        title: "Veterinarias",
        enumServicio: "VETERINARIA",
        link: `/servicios/${"VETERINARIA".toLowerCase().replace(/\s+/g, '')}`
    },
    {
        id: 6,
        title: "Cuidados",
        enumServicio: "CUIDADO_DE_MASCOTAS",
        link: `/servicios/${"CUIDADO_DE_MASCOTAS".toLowerCase().replace(/\s+/g, '')}`
    },
    {
        id: 7,
        title: "Paseos",
        enumServicio: "PASEO_DE_MASCOTAS",
        link: `/servicios/${"PASEO_DE_MASCOTAS".toLowerCase().replace(/\s+/g, '')}`
    },
];
