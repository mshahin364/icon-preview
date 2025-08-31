import { Container, Row, Col } from 'reactstrap'

interface HeaderProps {
  title: string
  subtitle?: string
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="header">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h1 className="display-4">{title}</h1>
            {subtitle && <p className="lead">{subtitle}</p>}
          </Col>
        </Row>
      </Container>
    </header>
  )
}