import React from "react";
import Button from "./Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex justify-center items-center space-x-4 ${className}`}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        variant="outline"
        size="sm"
        icon={<ChevronLeftIcon className="w-4 h-4" />}
      >
        Anterior
      </Button>
      
      <span className="text-accent-600">
        Página {currentPage + 1} de {totalPages}
      </span>
      
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        variant="outline"
        size="sm"
        icon={<ChevronRightIcon className="w-4 h-4" />}
      >
        Próxima
      </Button>
    </div>
  );
};

export default Pagination;