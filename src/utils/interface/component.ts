import React from "react";

export interface ButtonProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

export interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  className?: string;
}

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface NavbarProps {
  isHidden?: boolean;
}

export interface LayoutProps {
  children: React.ReactNode;
  isHidden?: boolean;
}

export interface LoadingProps {
  message?: string;
}
