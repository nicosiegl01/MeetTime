--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE "Meettime";




--
-- Drop roles
--

DROP ROLE meettime;


--
-- Roles
--

CREATE ROLE meettime;
ALTER ROLE meettime WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md5fe4862bc138e11d8235afbef62324c15';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Debian 13.2-1.pgdg100+1)
-- Dumped by pg_dump version 13.2 (Debian 13.2-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: meettime
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO meettime;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: meettime
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: meettime
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: meettime
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "Meettime" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Debian 13.2-1.pgdg100+1)
-- Dumped by pg_dump version 13.2 (Debian 13.2-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Meettime; Type: DATABASE; Schema: -; Owner: meettime
--

CREATE DATABASE "Meettime" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE "Meettime" OWNER TO meettime;

\connect "Meettime"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE "Meettime"; Type: COMMENT; Schema: -; Owner: meettime
--

COMMENT ON DATABASE "Meettime" IS 'Database for Meettime.';


--
-- Name: Meettime; Type: SCHEMA; Schema: -; Owner: meettime
--

CREATE SCHEMA "Meettime";


ALTER SCHEMA "Meettime" OWNER TO meettime;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Interest; Type: TABLE; Schema: Meettime; Owner: meettime
--

CREATE TABLE "Meettime"."Interest" (
    "Id" numeric(8,0) NOT NULL,
    "Name" character varying(32)[] NOT NULL
);


ALTER TABLE "Meettime"."Interest" OWNER TO meettime;

--
-- Name: Match; Type: TABLE; Schema: Meettime; Owner: meettime
--

CREATE TABLE "Meettime"."Match" (
    "selectedUserId" numeric(8,0) NOT NULL,
    "selectingUserId" numeric(8,0) NOT NULL
);


ALTER TABLE "Meettime"."Match" OWNER TO meettime;

--
-- Name: User; Type: TABLE; Schema: Meettime; Owner: meettime
--

CREATE TABLE "Meettime"."User" (
    id numeric(8,0) NOT NULL,
    fname character varying(32)[] NOT NULL,
    lname character varying(32)[] NOT NULL,
    email character varying(32)[] NOT NULL,
    password character varying(64)[] NOT NULL
);


ALTER TABLE "Meettime"."User" OWNER TO meettime;

--
-- Name: User_Interest; Type: TABLE; Schema: Meettime; Owner: meettime
--

CREATE TABLE "Meettime"."User_Interest" (
    "UserId" numeric(8,0) NOT NULL,
    "InterestId" numeric(8,0) NOT NULL
);


ALTER TABLE "Meettime"."User_Interest" OWNER TO meettime;

--
-- Name: Interest InterestId; Type: CONSTRAINT; Schema: Meettime; Owner: meettime
--

ALTER TABLE ONLY "Meettime"."Interest"
    ADD CONSTRAINT "InterestId" UNIQUE ("Id");


--
-- Name: Interest Interest_pkey; Type: CONSTRAINT; Schema: Meettime; Owner: meettime
--

ALTER TABLE ONLY "Meettime"."Interest"
    ADD CONSTRAINT "Interest_pkey" PRIMARY KEY ("Id");


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: Meettime; Owner: meettime
--

ALTER TABLE ONLY "Meettime"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: User id; Type: CONSTRAINT; Schema: Meettime; Owner: meettime
--

ALTER TABLE ONLY "Meettime"."User"
    ADD CONSTRAINT id UNIQUE (id);


--
-- Name: User_Interest InterestId; Type: FK CONSTRAINT; Schema: Meettime; Owner: meettime
--

ALTER TABLE ONLY "Meettime"."User_Interest"
    ADD CONSTRAINT "InterestId" FOREIGN KEY ("InterestId") REFERENCES "Meettime"."Interest"("Id") NOT VALID;


--
-- Name: User_Interest UserId; Type: FK CONSTRAINT; Schema: Meettime; Owner: meettime
--

ALTER TABLE ONLY "Meettime"."User_Interest"
    ADD CONSTRAINT "UserId" FOREIGN KEY ("UserId") REFERENCES "Meettime"."User"(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Debian 13.2-1.pgdg100+1)
-- Dumped by pg_dump version 13.2 (Debian 13.2-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: meettime
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO meettime;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: meettime
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

