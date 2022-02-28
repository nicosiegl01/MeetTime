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
DROP DATABASE test;




--
-- Drop roles
--

DROP ROLE meettime;
DROP ROLE meettime1;


--
-- Roles
--

CREATE ROLE meettime;
ALTER ROLE meettime WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md5fe4862bc138e11d8235afbef62324c15';
CREATE ROLE meettime1;
ALTER ROLE meettime1 WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;






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
    "Id" integer NOT NULL,
    "Name" character varying(32) NOT NULL
);


ALTER TABLE "Meettime"."Interest" OWNER TO meettime;

--
-- Name: Match; Type: TABLE; Schema: Meettime; Owner: meettime
--

CREATE TABLE "Meettime"."Match" (
    "selectedUserId" integer NOT NULL,
    "selectingUserId" integer NOT NULL
);


ALTER TABLE "Meettime"."Match" OWNER TO meettime;

--
-- Name: User; Type: TABLE; Schema: Meettime; Owner: meettime
--

CREATE TABLE "Meettime"."User" (
    id integer NOT NULL,
    fname character varying(32) NOT NULL,
    lname character varying(32) NOT NULL,
    email character varying(32) NOT NULL,
    password character varying(64) NOT NULL,
    age integer
);


ALTER TABLE "Meettime"."User" OWNER TO meettime;

--
-- Name: User_Interest; Type: TABLE; Schema: Meettime; Owner: meettime
--

CREATE TABLE "Meettime"."User_Interest" (
    "UserId" integer NOT NULL,
    "InterestId" integer NOT NULL
);


ALTER TABLE "Meettime"."User_Interest" OWNER TO meettime;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: Meettime; Owner: meettime
--

ALTER TABLE "Meettime"."User" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Meettime"."User_id_seq"
    START WITH 2
    INCREMENT BY 1
    MINVALUE 2
    MAXVALUE 1000000
    CACHE 1
);


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
    "Id" integer NOT NULL,
    "Name" character varying(32) NOT NULL
);


ALTER TABLE "Meettime"."Interest" OWNER TO meettime;

--
-- Name: Match; Type: TABLE; Schema: Meettime; Owner: meettime
--

CREATE TABLE "Meettime"."Match" (
    "selectedUserId" integer NOT NULL,
    "selectingUserId" integer NOT NULL,
    interest integer NOT NULL
);


ALTER TABLE "Meettime"."Match" OWNER TO meettime;

--
-- Name: User; Type: TABLE; Schema: Meettime; Owner: meettime
--

CREATE TABLE "Meettime"."User" (
    id integer NOT NULL,
    fname character varying(32) NOT NULL,
    lname character varying(32) NOT NULL,
    email character varying(32) NOT NULL,
    password character varying(64) NOT NULL,
    age integer
);


ALTER TABLE "Meettime"."User" OWNER TO meettime;

--
-- Name: User_Interest; Type: TABLE; Schema: Meettime; Owner: meettime
--

CREATE TABLE "Meettime"."User_Interest" (
    "UserId" integer NOT NULL,
    "InterestId" integer NOT NULL
);


ALTER TABLE "Meettime"."User_Interest" OWNER TO meettime;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: Meettime; Owner: meettime
--

ALTER TABLE "Meettime"."User" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Meettime"."User_id_seq"
    START WITH 2
    INCREMENT BY 1
    MINVALUE 2
    MAXVALUE 1000000
    CACHE 1
);


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
-- Name: Match interestId; Type: FK CONSTRAINT; Schema: Meettime; Owner: meettime
--

ALTER TABLE ONLY "Meettime"."Match"
    ADD CONSTRAINT "interestId" FOREIGN KEY (interest) REFERENCES "Meettime"."Interest"("Id") NOT VALID;


--
-- PostgreSQL database dump complete
--

--
-- Database "test" dump
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
-- Name: test; Type: DATABASE; Schema: -; Owner: meettime
--

CREATE DATABASE test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE test OWNER TO meettime;

\connect test

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
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

