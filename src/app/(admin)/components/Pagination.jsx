'use client'
import {ArrowLeft, ArrowRight} from 'react-feather'
import { usePathname, useSearchParams } from 'next/navigation';
import { generatePagination } from "@/helpers/generatePagination";
import Link from 'next/link';

export default function Pagination({totalPages}) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const allPages = generatePagination(currentPage, totalPages);

    const createPageURL = (pageNumber) => {
        //aqui creamos el La URL con sus parametros
        const params = new URLSearchParams(searchParams);
        //config, le anadimos page cuando cambie
        params.set('page', pageNumber.toString());
        //retornamos el path hecho
        return `${pathname}?${params.toString()}`;
    };

    
  return (
    <>
        <div className="flex justify-center mt-8">
            <div className="inline-flex">
                <PaginationArrow
                    direction="left"
                    href={createPageURL(currentPage - 1)}
                    isDisabled={currentPage <= 1}
                />
                
                <div className="flex -space-x-px">
                {allPages.map((page, index) => {
                    let position = 'first' || 'last' || 'single' || 'middle' || undefined;

                    if (index === 0) position = 'first';
                    if (index === allPages.length - 1) position = 'last';
                    if (allPages.length === 1) position = 'single';
                    if (page === '...') position = 'middle';

                    return (
                        <PaginationNumber
                            key={page}
                            href={createPageURL(page)}
                            page={page}
                            position={position}
                            isActive={currentPage === page}
                        />
                    );
                })}
                </div>

                <PaginationArrow
                    direction="right"
                    href={createPageURL(currentPage + 1)}
                    isDisabled={currentPage >= totalPages}
                />
            </div>
        </div>
    </>
  )
}

function PaginationNumber({page, href, isActive, position = ['first' || 'last' || 'middle' || 'single'],}) {

    const stylesDefault = 'flex h-10 w-10 items-center justify-center text-sm border'

    return isActive || position === 'middle' ? (
        <div 
            className={`
                ${stylesDefault} 
                ${position === 'first' || position === 'single' && 'rounded-l-md'}
                ${position === 'last' || position === 'single' && 'rounded-r-md'}
                ${isActive && 'z-10 bg-primary border-bg-primary text-white'}
                ${!isActive && position !== 'middle' && 'hover:bg-gray-100'}
                ${position === 'middle' && 'text-gray-300'}
                `
            }
        >
            {page}
        </div>
    ) : (
        <Link 
            href={href}
            className={`
                ${stylesDefault} 
                ${position === 'first' || position === 'single' && 'rounded-l-md'}
                ${position === 'last' || position === 'single' && 'rounded-r-md'}
                ${isActive && 'z-10 bg-primary border-bg-primary text-white'}
                ${!isActive && position !== 'middle' && 'hover:bg-gray-100'}
                ${position === 'middle' && 'text-gray-300'}
                `
            }
        >
            {page}
        </Link>
    );
}


function PaginationArrow({href, direction = ['left' || 'right'], isDisabled}) {
    const icon =
    direction === 'left' ? (
      <ArrowLeft className="w-4" />
    ) : (
      <ArrowRight className="w-4" />
    );

    const stylesDefault = 'flex h-10 w-10 items-center justify-center rounded-md border'

  return isDisabled ? (
    <div 
        className={
            `${stylesDefault} ${isDisabled && 'pointer-events-none text-gray-300'} 
            ${!isDisabled && 'hover:bg-gray-100'}
            ${direction === 'left' && 'mr-2 md:mr-4'}
            ${direction === 'right' && 'ml-2 md:ml-4'}
            `
        }
    >{icon}
    </div>
  ) : (
    <Link 
        className={
        `${stylesDefault} ${isDisabled && 'pointer-events-none text-gray-300'} 
        ${!isDisabled && 'hover:bg-gray-100'}
        ${direction === 'left' && 'mr-2 md:mr-4'}
        ${direction === 'right' && 'ml-2 md:ml-4'}
        `
    } 
        href={href}
    >
      {icon}
    </Link>
    
  );
}