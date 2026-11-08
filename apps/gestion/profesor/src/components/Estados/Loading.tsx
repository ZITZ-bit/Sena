"use client";

import styles from "@/modules/loading.module.css";

const cuadrados = [
  { posicion: "col-start-1 row-start-1", delay: "0ms" },
  { posicion: "col-start-2 row-start-1", delay: "125ms" },
  { posicion: "col-start-3 row-start-1", delay: "250ms" },
  { posicion: "col-start-3 row-start-2", delay: "375ms" },
  { posicion: "col-start-3 row-start-3", delay: "500ms" },
  { posicion: "col-start-2 row-start-3", delay: "625ms" },
  { posicion: "col-start-1 row-start-3", delay: "750ms" },
  { posicion: "col-start-1 row-start-2", delay: "875ms" },
  { posicion: "col-start-2 row-start-2", delay: "1000ms" },
];

const tamaños = {
  sm: {
    contenedor: "h-10 w-10 gap-0.5",
    cuadrado: "h-2.5 w-2.5",
  },

  md: {
    contenedor: "h-16 w-16 gap-1",
    cuadrado: "h-4 w-4",
  },

  lg: {
    contenedor: "h-20 w-20 gap-1.5",
    cuadrado: "h-5 w-5",
  },
};

type Tamaño = keyof typeof tamaños;

interface LoadingProps {
  size?: Tamaño;
}

export default function Loading({ size = "md" }: LoadingProps) {
  const tamaño = tamaños[size];

  return (
    <section className="flex flex-col items-center justify-center gap-5">
      <div className={`grid grid-cols-3 grid-rows-3 ${tamaño.contenedor}`}>

        {cuadrados.map((cuadrado, index) => (
          <div
            key={index}
            className={`
              ${cuadrado.posicion}
              ${styles.cuadrado}
              ${tamaño.cuadrado}
              self-center
              justify-self-center
              bg-[#444A5C]
            `}
            style={{
              animationDelay: cuadrado.delay,
            }}
          />
        ))}
        
      </div>

      <p className={`${styles.texto} text-sm font-medium tracking-wide text-[#444A5C]`}>
        Cargando Datos
      </p>

    </section>
  );
}