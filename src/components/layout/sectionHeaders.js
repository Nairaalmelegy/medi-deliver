export default function SectionHeaders({subHeader, mainHeader}){
    return(
        <>
            <h3 className="text-gray-600 font-semibold">{subHeader}</h3>
            <h2 className="text-primary font-bold text-4xl mb-4">{mainHeader}</h2>
        </>
    );
}