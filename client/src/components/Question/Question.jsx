import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import React from "react";

const Question = () => {
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className="my-5 p-4 shadow-cellphone">
      <h1 className="text-2xl text-[#d02c35] font-bold text-center uppercase">
        Câu hỏi thường gặp
      </h1>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography className="!text-[#000] !font-semibold !text-[15px]">
            Bút S-Pen có được trang bị sẵn trên Samsung Galaxy S22 Ultra không?
            Có những tính năng nào nổi bật?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="!text-sm !text-[#4a4a4a]">
            Bút S-Pen Samsung Galaxy S22 Ultra trang bị đầy đủ tính năng như:
            Chuyển chữ viết tay thành văn bản, Ghi chú trên màn hình khóa, Chụp
            ảnh từ xa, Các điều khiển không chạm, Tô màu…
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography className="!text-[#000] !font-semibold !text-[15px]">
            Chụp ảnh chuyên nghiệp bằng Samsung S22 Ultra có được không?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="!text-sm !text-[#4a4a4a]">
            Thiết bị sở hữu cụm Camera chuyên nghiệp được hỗ trợ bởi các cải
            tiến AI mang tính cách mạng giúp khả năng chụp ảnh Ban đêm. Các cải
            tiến bao gồm Cảm biến điểm ảnh lớn, Lớp Kính & Ống kính siêu trong,
            Công cụ nâng cao chi tiết, Tốc độ khung hình tự động, Giải pháp siêu
            ban đêm và Thích ứng điểm ảnh. Nhờ vậy Galaxy S22 Ultra hoàn toàn có
            thể đáp ứng nhu cầu chụp ảnh chuyên nghiệp của bạn.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography className="!text-[#000] !font-semibold !text-[15px]">
            Samsung Galaxy S22 Ultra có chơi game nặng được không?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="!text-sm !text-[#4a4a4a]">
            Galaxy S22 Ultra hoàn toàn là một lựa chọn hoàn hảo để chơi game vì
            nó được trang bị bộ vi xử lý 4nm nhanh, pin lâu và khả năng lưu trữ
            lớn. Đặc biệt, với chip Snapdragon 8 Gen 1 mạnh mẽ giúp bạn chiến
            mọi tựa game.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Question;
