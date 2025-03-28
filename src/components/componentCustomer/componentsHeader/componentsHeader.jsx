import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./ComponentsHeader.css";
import useAuth from "../../../utils/hook/useAuth";
import { logout } from "../../../contexts/AuthContext/reducer";
import { FaUser } from "react-icons/fa"; // Đổi sang icon người dùng
import { FaBars } from "react-icons/fa";
import PRE from "../../../assets/asstetsCustomer/HeartPicture.png";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getWalletByUserId } from "../../../pages/pagesCustomer/customerServices";
function ComponentsHeader() {
  const navigate = useNavigate();
  const { user, dispatch } = useAuth();
  const [walletBalance, setWalletBalance] = useState(0);

  // Fetch wallet balance on component mount
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (user) {
          const wallet = await getWalletByUserId(user.id); // Fetch wallet balance
          setWalletBalance(wallet.balance); // Update state with wallet balance
        }
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    };

    fetchBalance();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin user
    localStorage.removeItem("token"); // Xóa token
    dispatch(logout()); // Cập nhật trạng thái đăng xuất (nếu sử dụng reducer)
    toast.success("Logout successful!"); // Hiển thị thông báo thành công
    navigate("/login"); // Chuyển hướng đến trang đăng nhập
  };
  return (
    <Navbar
      expand="md"
      className="navbar-light w-100"
      style={{ height: "100px" }}
    >
      <Container>
        {/* Align Navbar.Brand to the left */}
        <Navbar.Brand
          href="/customer-home"
          className="fw-bold d-flex align-items-center"
        >
          <img
            src={PRE}
            width="50px"
            height="50px"
            alt="Logo"
            className="me-3"
          />
          <h2 className="title"> PRE MARITIAL 2025</h2>
        </Navbar.Brand>

        {/* Toggle button for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FaBars size={24} />
        </Navbar.Toggle>

        {/* Navigation links and user dropdown */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {" "}
            {/* Push navigation links to the right */}
            <Nav.Link as={NavLink} to="/customer-home/view-articles">
              Articles
            </Nav.Link>
            <Nav.Link as={NavLink} to="/customer-home/view-therapists">
              Therapists
            </Nav.Link>
            <Nav.Link as={NavLink} to="/customer-home/view-bookings">
              Bookings
            </Nav.Link>
            <Nav.Link as={NavLink} to="/user/quizzes">
              Quizzes
            </Nav.Link>
            {/* User dropdown */}
            <NavDropdown
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaUser size={20} style={{ marginRight: "8px" }} />
                  {user && (
                    <>
                      <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                        {user.username}
                      </span>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#28a745", // Green color for balance
                        }}
                      >
                        {walletBalance.toFixed(2)}VND
                      </span>
                    </>
                  )}
                </div>
              }
              id="user-dropdown"
              align="end"
            >
              {user ? (
                <>
                  <NavDropdown.Item as={NavLink} to="/customer-home/profile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/customer-home/wallet">
                    My Wallet
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to="/customer-home/transactionHistory"
                  >
                    Transaction History
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Log out
                  </NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item onClick={() => navigate("/login")}>
                  Login
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ComponentsHeader;
