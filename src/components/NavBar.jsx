"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";
import { Drawer, Button, Menu, Row, Col } from "antd";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // ✅ Menu Items with submenu for "Company"
  const menuItems = [
    { key: "1", label: <Link href="/">Home</Link> },
    {
      key: "2",
      label: (
        <span>
          Company <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
        </span>
      ),
      children: [
        {
          key: "2-1",
          label: <Link href="/about">About</Link>,
        },
        {
          key: "2-2",
          label: <Link href="/history">History</Link>,
        },
      ],
    },
    { key: "3", label: <Link href="/contact">Contact</Link> },
  ];

  return (
    <nav className="shadow-md bg-green-900 fixed top-0 left-0 w-full z-50">
      <Row
        align="middle"
        justify="space-between"
        className="px-6 py-3 mx-auto w-full max-w-7xl"
      >
        {/* Logo */}
        <Col>
          <Link href="/" className="text-white text-2xl font-bold">
            MyWebsite
          </Link>
        </Col>

        {/* Desktop Menu */}
        <Col xs={0} md={12} lg={12}>
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{
              backgroundColor: "transparent",
              borderBottom: "none",
              color: "white",
            }}
            className="text-white flex justify-center font-medium"
          />
        </Col>

        {/* Login Button */}
        <Col xs={0} md={4} lg={4} className="text-right">
          <Button
            type="primary"
            style={{
              backgroundColor: "#15803d",
              borderColor: "#15803d",
            }}
          >
            Login
          </Button>
        </Col>

        {/* Mobile Menu Button */}
        <Col md={0}>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 22, color: "white" }} />}
            onClick={showDrawer}
          />
        </Col>
      </Row>

      {/* Mobile Drawer Menu */}
      <Drawer
        title="MyWebsite"
        placement="right"
        onClose={onClose}
        open={open}
        closeIcon={<CloseOutlined />}
        bodyStyle={{ backgroundColor: "#064e3b", color: "white" }}
      >
        <Menu
          mode="inline"
          items={menuItems}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
          }}
          onClick={onClose}
        />
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#15803d",
            borderColor: "#15803d",
            marginTop: "1rem",
          }}
        >
          Login
        </Button>
      </Drawer>
    </nav>
  );
}
