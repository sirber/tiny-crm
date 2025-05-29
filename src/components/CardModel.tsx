import React from "react";
import { Modal, Card, SxProps, Theme } from "@mui/material";

type CardModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  sx?: SxProps<Theme>; // Optional styling override
};

export default function CardModal({
  open,
  onClose,
  children,
  sx,
}: CardModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Card
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          boxShadow: 24,
          borderRadius: 2,
          p: 2,
          ...sx,
        }}
      >
        {children}
      </Card>
    </Modal>
  );
}
