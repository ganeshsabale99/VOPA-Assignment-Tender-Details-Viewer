import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableSortLabel,
  Typography,
  TablePagination,
  // TextField,
  Box,
} from "@mui/material";
import TenderModal from "./components/TenderModal";
import TenderChart from "./components/TenderChart";
import ThreeDLoader from "./components/Loader/ThreeDCircleLoader";
import moment from "moment";
import LoadingFailedIMG from "./assests/images/failed_to_load_data.png";

const App = () => {
  const [tenders, setTenders] = useState([]);
  const [selectedTender, setSelectedTender] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  // const [search, setSearch] = useState("");

  const fetchThroughProxy = async (url) => {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
      url
    )}`;
    const response = await axios.get(proxyUrl);
    return JSON.parse(response.data.contents);
  };

  useEffect(() => {
    fetchThroughProxy("https://tenders.guru/api/es/tenders")
      .then((data) => {
        setTenders(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch tenders.");
        setLoading(false);
      });
  }, []);

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const handleRowClick = (tenderId) => {
    console.log("Row clicked: ", tenderId);
    fetchThroughProxy(`https://tenders.guru/api/es/tenders/${tenderId}`)
      .then((data) => {
        setSelectedTender(data);
        console.log("Tender clicked:", data);
        setOpen(true);
      })
      .catch(() => alert('Failed to load tender details.'));
  };

  // const handleSearch = (e) => {
  //   const value = e.target.value.toLowerCase();
  //   setSearch(value);
  //   const filtered = tenders.filter((tender) =>
  //     tender.title?.toLowerCase().includes(value)
  //   );
  //   setTenders(filtered);
  //   setPage(0);
  // };

  // const handleOpen = (tender) => {
  //   setSelectedTender(tender);
  //   setOpen(true);
  // };

  const sortedData = [...tenders].sort((a, b) => {
    const valueA = a[orderBy] || "";
    const valueB = b[orderBy] || "";
    if (typeof valueA === "string" && typeof valueB === "string") {
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    return order === "asc" ? valueA - valueB : valueB - valueA;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  console.log("Tenders:", tenders);
  console.log("Filtered Tenders:", paginatedData);
  console.log("Selected Tender:", selectedTender);
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Order By:", orderBy);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        color="#116b8f"
        sx={{
          fontWeight: "bold",
          letterSpacing: "1px",
          mb: 2,
          fontFamily: "Arial, sans-serif",
          textShadow: "1px 1px 2px rgba(33, 30, 224, 0.2)",
          background: "linear-gradient(to right, #116b8f,rgb(35, 154, 245))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textFillColor: "transparent",
          textAlign: "center",
          fontSize: "2.5rem",
          lineHeight: "1.2",
          marginBottom: "20px",
          textDecoration: "underline",
          textDecorationColor: "#116b8f",
          textDecorationThickness: "2px",
        }}
      >
        Spanish Tenders Dashboard
      </Typography>

      {/* <TextField
        label="Search by Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearch}
        sx={{
          borderRadius: "50px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
          },
        }}
      /> */}

      {loading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <ThreeDLoader />
        </Box>
      )}
      {!loading && !error && paginatedData.length === 0 && (
        <Typography align="center" sx={{ mt: 2 }}>
          No tenders found.
        </Typography>
      )}

      {error && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            textAlign: "center",
          }}
        >
          <img
            src={LoadingFailedIMG}
            alt="Loading Failed"
            style={{ maxWidth: "300px", marginBottom: "20px" }}
          />
          <Typography
            color="error"
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {error}
          </Typography>
        </Box>
      )}

      {!loading && !error && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  {[
                    { id: "id", label: "ID" },
                    { id: "title", label: "Title" },
                    { id: "category", label: "Category" },
                    { id: "awarded", label: "Supplier" },
                    { id: "date", label: "Date" },
                  ].map((head) => (
                    <TableCell key={head.id} align="center" font-weight="80">
                      <TableSortLabel
                        active={orderBy === head.id}
                        direction={orderBy === head.id ? order : "asc"}
                        onClick={() => handleSort(head.id)}
                      >
                        {head.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((tender, index) => (
                  <TableRow key={tender.id} hover onClick={() => handleRowClick(tender.id)}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell align="center">{tender.id}</TableCell>
                    <TableCell>{tender.title}</TableCell>
                    <TableCell align="center">{tender.category}</TableCell>
                    <TableCell align="center">
                      {tender.awarded?.[0]?.suppliers_name || "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {tender.date
                        ? moment(tender.date).format("DD-MM-YYYY")
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={tenders.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
          />
          <Box mt={4}>
            <TenderChart tenders={paginatedData} />
          </Box>
        </>
      )}

      <TenderModal
        open={open}
        handleClose={() => setOpen(false)}
        tender={selectedTender}
      />
    </Container>
  );
};

export default App;
