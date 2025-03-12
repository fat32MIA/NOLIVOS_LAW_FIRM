import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Acerca de Nosotros</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <Image 
            src="/images/guillermo-nolivos.png" 
            alt="Guillermo Nolivos - Abogado de Inmigración"
            width={500}
            height={600}
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-4">Guillermo Nolivos</h2>
          <h3 className="text-xl text-blue-600 dark:text-blue-400 mb-6">Abogado Especialista en Inmigración</h3>
          
          <p className="mb-4">
            Con más de 15 años de experiencia en derecho migratorio, Guillermo Nolivos ha ayudado a 
            cientos de clientes a navegar con éxito el complejo sistema de inmigración.
          </p>
          
          <p className="mb-4">
            Graduado con honores de la Facultad de Derecho de la Universidad de Columbia, 
            Guillermo se especializa en casos de asilo político, visas de trabajo y reunificación familiar.
          </p>
          
          <p className="mb-4">
            Su compromiso con la justicia y su enfoque personalizado en cada caso han 
            hecho de Nolivos Law una firma reconocida por su excelencia y resultados.
          </p>
          
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-2">Áreas de Especialización:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Visas de trabajo (H-1B, L-1, O-1)</li>
              <li>Asilo político y refugio</li>
              <li>Reunificación familiar</li>
              <li>Naturalización y ciudadanía</li>
              <li>Defensa contra deportación</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}